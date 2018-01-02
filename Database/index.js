const Sequelize = require('sequelize');
const mysql = require('mysql');
const Promise = require("bluebird");
const fs = require('fs');
const path = require('path');

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

// Purchase.sync({ force: true });
// Weekly_product_purchase.sync({ force: true });

const getWeeklyProductPurchases = (weekStart, weekEnd) => {
  var sql1 = 'insert into weekly_product_purchases (product_id, individual_purchase_count, week_start_date) select p1.product_id as product_id, p1.quantity as quantity, p1.date as date from purchases as p1 where p1.date between ? and ? and p1.isBundle=0';

  var sql2 = 'update weekly_product_purchases w left join purchases p on w.product_id = p.product_id and w.week_start_date=p.date set w.bundle_purchase_count = p.quantity where p.isBundle = 1 and p.date between ? and ?;';

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

const updateWithInventory = (callback) => {
  var output = [];
  var sql = 'select product_id, SUM(quantity) as total_quantity from purchases where date=\'2017-12-24\' group by product_id;';

  return sequelize.query(sql)
  .then((data) => { 
    console.log('---', data[0]);
    output = output.concat(data[0]); 
    callback(output);
    return data;
  })
  // .then((output) => {
  //   fs.writeFile(path.join(__dirname + '/../Utils/dailyInventoryUpdate.json'), JSON.stringify(output), function() {
  //     console.log('inventory update data generated successfully!');
  //   })
  // })
  .catch((err) => console.log(err)); 

  // return output;
}

exports.Purchase = Purchase;
exports.Weekly_product_purchase = Weekly_product_purchase;
exports.sequelize = sequelize;
exports.getWeeklyProductPurchases = getWeeklyProductPurchases;
exports.updateWithInventory = updateWithInventory;

