const express = require('express');
const cors = require('cors');
const faker = require('faker');
const app = express();
//const purchases = require('./generatePurchases');
app.set('port', 3500);

// app.use(cors());

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
  
})

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});