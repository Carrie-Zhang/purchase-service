const mysql = require('mysql');
const db = require('../Database/index');

var sql1 = 'insert into weekly_product_purchases (product_id, individual_purchase_count, week_start_date) select p1.product_id as product_id, SUM(p1.quantity) as SumQuantity, p1.date as date from purchases as p1 where p1.date between ? and ? and p1.isBundle=0 group by p1.product_id';

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

var week = [['2017-10-01','2017-10-07'],['2017-10-08','2017-10-14'],['2017-10-15','2017-10-21'],['2017-10-22','2017-10-28'],['2017-10-29','2017-11-04'],['2017-11-05','2017-11-11'],['2017-11-12','2017-11-18'],['2017-11-19','2017-11-25'],['2017-11-26','2017-12-02'],['2017-12-03','2017-12-09'],['2017-12-10','2017-12-16'],['2017-12-17','2017-12-23'], ['2017-12-24','2017-12-30']];

for (var i = 0; i < week.length; i++) {

  db.sequelize.query(sql1, {replacements: [week[i][0], week[i][1]], type: db.sequelize.QueryTypes.INSERT})
  .then((data) => {
    console.log(data);
  })

  // db.Purchase.findAll({
  //   attributes: ['product_id', 'quantity', 'date'],
  //   where: {
  //     isBundle : 0,
  //     date: { $between : [week[i][0], week[i][1]] }
  //   }
  // })
  // .then((result) => { 
  //   var res = [];
  //   for (var j = 0; j < result.length; j++) {
  //     res.push(result[j].dataValues);
  //   }
  //   console.log('***', res);
  //   return res;
    // //var res = [];
    // for (var j = 0; j < result.length; j++) {
    //   //res.push(result[j].dataValues);
    //   db.Weekly_product_purchase.bulkCreate(
    //     result[j].dataValues, 
    //     {fields: ['product_id', 'individual_purchase_count', 'week_start_date']}) 
    // }
    //return res;
  // })
  // .then((res) => {
  //   //console.log('---', res);
  //   db.Weekly_product_purchase.bulkCreate(
  //     res,
  //     {fields: ['product_id', 'individual_purchase_count', 'week_start_date']}) 
      
  // })
  // .then(() => {
  //   //process.exit();
  //   return db.Weekly_product_purchase.update({'week_start_date': week[i][0]})
  // })
  .then(() => process.exit())
  .catch((err) => console.log(err));
}