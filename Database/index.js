const Sequelize = require('sequelize');
const mysql = require('mysql');
const Promise = require("bluebird");

var sequelize = new Sequelize('bundlin', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
        timestamps: false
  }
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.error('Unable to connect to database:', err));


const Purchase = sequelize.define('purchase', {
  user_id: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  price: Sequelize.STRING,
  isBundle: Sequelize.BOOLEAN,
  date: Sequelize.DATEONLY
});

const Weekly_product_purchase = sequelize.define('weekly_product_purchase', {
  product_id: Sequelize.INTEGER,
  individual_purchase_count: {type: Sequelize.INTEGER, defaultValue: 0},
  bundle_purchase_count: {type: Sequelize.INTEGER, defaultValue: 0},
  week_start_date: Sequelize.DATEONLY
});

Purchase.sync({ force: true });
Weekly_product_purchase.sync({ force: true });

const getWeeklyProductPurchases = (weekStart, weekEnd) => {
  var sql1 = 'insert into weekly_product_purchases (product_id, individual_purchase_count, week_start_date) select p1.product_id as product_id, p1.quantity, p1.date as date from purchases as p1 where p1.date between ? and ? and p1.isBundle=0';
  var sql2 = 'update weekly_product_purchases w left join purchases p on w.product_id = p.product_id set w.bundle_purchase_count=p.quantity where p.isBundle=1 and p.date between ? and ?;';
  var sql3 = 'update weekly_product_purchases set week_start_date = DATE_ADD(week_start_date, INTERVAL(1-DAYOFWEEK(week_start_date)) DAY) where week_start_date between ? and ?;';

  sequelize.query(sql1, {replacements: [weekStart, weekEnd], type: db.sequelize.QueryTypes.INSERT})
  .then(() => {
    sequelize.query(sql2, {replacements: [weekStart, weekEnd], type: db.sequelize.QueryTypes.UPDATE})
  })
  .then(() => {
    sequelize.query(sql3, {replacements: [weekStart, weekEnd], type: db.sequelize.QueryTypes.UPDATE});
  })
  .then(() => process.exit())
  .catch((err) => console.log(err));
}

// const updateWithInventory = () => {
//   var sql = 'select product_id, quantity, date from purchases where date > ? + '00:00:00' and date < '2017-12-12 23:59:59';';

// }

exports.Purchase = Purchase;
exports.Weekly_product_purchase = Weekly_product_purchase;
exports.sequelize = sequelize;
exports.getWeeklyProductPurchases = getWeeklyProductPurchases;
// exports.updateWithInventory = updateWithInventory;

