const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const db = require('../Database/index');
const app = express();
//const purchases = require('./generatePurchases');
app.set('port', 3500);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// app.get('/purchases', (req, res) => {
//   //res.json(purchases);
//   var purchases = [];

//   for (var id = 0; id < 10; id++) {

//     purchases.push({
//       id: id,
//       user_id: faker.random.number(10),
//       product_id: faker.random.number(10),
//       quantity: faker.random.number({min:5, max:10}),
//       price: faker.commerce.price(),
//       date: faker.date.between('2017-10-01', '2017-12-31'),
//       isBundle: faker.random.boolean()
//     })
//   }
//   res.json(purchases);
// });

app.post('/purchases', (req, res) => {
  console.log(req.body);
  db.query('INSERT INTO purchase SET ?', req.body, (err, result) => {
    if(err) console.log(err);
    console.log('Insert success!');
    res.end();
  });
});



app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});