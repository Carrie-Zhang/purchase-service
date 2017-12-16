
const Sequelize = require('sequelize');
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
  date: Sequelize.DATE
});

const Weekly_product_purchase = sequelize.define('weekly_product_purchase', {
  product_id: Sequelize.INTEGER,
  individual_purchase_count: {type: Sequelize.INTEGER, defaultValue: 0},
  bundle_purchase_count: {type: Sequelize.INTEGER, defaultValue: 0},
  week_start_date: Sequelize.DATE
});

// Purchase.sync({ force: true });
// Weekly_product_purchase.sync({ force: true });

exports.Purchase = Purchase;
exports.Weekly_product_purchase = Weekly_product_purchase;
exports.sequelize = sequelize;

