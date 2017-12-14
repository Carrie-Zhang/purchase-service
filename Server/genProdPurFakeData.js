const mysql = require('mysql');
const db = require('../Database/index');

var sql1 = 'insert into product_purchase (product_id, individual_purchase_count) select p1.product_id as product_id, p1.quantity as quantity from purchase as p1 where p1.isBundle = 0 on duplicate key update individual_purchase_count=individual_purchase_count+p1.quantity;';

var sql2 = 'insert into product_purchase (product_id, bundle_purchase_count) select p1.product_id as product_id, p1.quantity as quantity from purchase as p1 where p1.isBundle = 1 on duplicate key update bundle_purchase_count=bundle_purchase_count+p1.quantity;';

db.query(sql1, function (err, result) {
  if (err) console.log(err);
  console.log('Number of records inserted or updated: ' + result.affectedRows);
  db.query(sql2, function (err, result) {
    if (err) console.log(err);
    console.log('Number of records inserted or updated: ' + result.affectedRows);
    db.end();
  });
});