const faker = require('faker');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bundlin',
  multipleStatements: true
});

con.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Connected!");

  var purchases = [];
  for (var id = 0; id < 100; id++) {
    purchases.push([faker.random.number(100), 
                    faker.random.number(100), 
                    faker.random.number({min:5, max:10}), 
                    faker.commerce.price(), 
                    faker.random.number({min:0, max:1}), 
                    faker.date.between('2017-10-01', '2017-12-31')
                    ])
  }

  var sql = 'INSERT INTO purchase (user_id, product_id, quantity, price, isBundle, date) VALUES ?';

  con.query(sql, [purchases], function (err, result) {
    if (err) console.log(err);
    console.log("Number of records inserted: " + result.affectedRows);
    con.end();
  });
});


//const { db } = require('../Database/index');
// const pgp = require('pg-promise')();

// const configObj = {
//   host: 'localhost',
//   database: 'bundlin',
//   user: 'bundlin',
// };

// const db = pgp(configObj);

// Concatenates an array of objects or arrays of values, according to the template,
// to use with insert queries. Can be used either as a class type or as a function.
//
// template = formatting template string
// data = array of either objects or arrays of values
// function Inserts(template, data) {
//     if (!(this instanceof Inserts)) {
//         return new Inserts(template, data);
//     }
//     this.rawType = true;
//     this.toPostgres = () => data.map(d => '(' + pgp.as.format(template, d) + ')').join();
// }

// var user_id, product_id, quantity, price, quantity, price, date, isBundle;
// var purchases = [];

// for (var id = 0; id < 10; id++) {
//   purchases.push({
//     user_id: faker.random.number(100),
//     product_id: faker.random.number(100),
//     quantity: faker.random.number({min:5, max:10}),
//     price: faker.commerce.price(),
//     date: faker.date.between('2017-10-01', '2017-12-31'),
//     isBundle: faker.random.boolean()
//   })
// }

// var values = new Inserts(`${user_id}, ${product_id}, ${quantity}, ${price}, ${date}, ${isBundle}`, purchases);

// db.none('INSERT INTO purchase (user_id, product_id, quantity, price, date, isBundle) VALUES $1', values)
// .then(data =>{
//   console.log('insert successful');
// })
// .catch(error => {
//   console.log('insert failed: ', error);
// })
