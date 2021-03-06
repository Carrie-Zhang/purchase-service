const mysql = require('mysql');
const Promise = require("bluebird");
const db = require('../database/index');

// insert individual purchases
var sql1 = 'insert into weekly_product_purchases (product_id, individual_purchase_count, week_start_date) select p1.product_id as product_id, p1.quantity as quantity, p1.date as date from purchases as p1 where p1.date between ? and ? and p1.isBundle=0;';

// update bundle purchases for the same period time
var sql2 = 'update weekly_product_purchases w left join purchases p on w.product_id = p.product_id and w.week_start_date=p.date set w.bundle_purchase_count = p.quantity where p.isBundle = 1 and p.date between ? and ?;';

// update the week_start_date
var sql3 = 'update weekly_product_purchases set week_start_date = DATE_ADD(week_start_date, INTERVAL(1-DAYOFWEEK(week_start_date)) DAY) where week_start_date between ? and ?;';

// get the total weekly purchase count for each product
var sql4 = 'select product_id, SUM(individual_purchase_count) as individual_total, SUM(bundle_purchase_count) as bundle_total, week_start_date from weekly_product_purchases group by product_id, week_start_date;';

var weeks = [['2017-10-01','2017-10-07'],['2017-10-08','2017-10-14'],['2017-10-15','2017-10-21'],['2017-10-22','2017-10-28'],['2017-10-29','2017-11-04'],['2017-11-05','2017-11-11'],['2017-11-12','2017-11-18'],['2017-11-19','2017-11-25'],['2017-11-26','2017-12-02'],['2017-12-03','2017-12-09'],['2017-12-10','2017-12-16'],['2017-12-17','2017-12-23'], ['2017-12-24','2017-12-30']];

// make loop function promise
var getWeeklyProductPurchases = function() {
  return Promise.map(weeks, (week) => {
    return db.sequelize.query(sql1, {replacements: [week[0], week[1]], type: db.sequelize.QueryTypes.INSERT})
    .then(() => {
      console.log('sql2 *****', week);
      return db.sequelize.query(sql2, {replacements: [week[0], week[1]], type: db.sequelize.QueryTypes.UPDATE})
    })
    .then(() => {
      console.log('sql3 ----', week);
      return db.sequelize.query(sql3, {replacements: [week[0], week[1]], type: db.sequelize.QueryTypes.UPDATE});
    })
    // .then(() => {
    //   return db.sequelize.query(sql4)
    // })
    .catch((err) => console.log(err))
    })
}

// when all the queries done exit the process
getWeeklyProductPurchases().then(() => process.exit());

module.exports = getWeeklyProductPurchases;
// var sql2 = 'insert into product_purchase (product_id, bundle_purchase_count) select p1.product_id as product_id, p1.quantity as quantity from purchase as p1 where p1.isBundle = 1 on duplicate key update bundle_purchase_count=bundle_purchase_count+p1.quantity;';

// db.query(sql1, function (err, result) {
//   if (err) console.log(err);
//   console.log('Number of records inserted or updated: ' + result.affectedRows);
//   db.query(sql2, function (err, result) {
//     if (err) console.log(err);
//     console.log('Number of records inserted or updated: ' + result.affectedRows);
//     db.end();
//   });
// });
