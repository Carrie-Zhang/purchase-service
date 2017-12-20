const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const db = require('../database/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('port', 3500);

app.post('/purchases', (req, res) => {

  if (typeof req.body.purchases === 'string') {
    db.Purchase.bulkCreate(JSON.parse(req.body.purchases.toString()))
    .then((response) => {
      // console.log(response);
      res.status(201).end()
    })
    .catch((err) => console.log(err));
  }

  db.Purchase.bulkCreate(req.body)
  .then((response) => {
    //console.log(response);
    res.status(201).end()
  })
  .catch((err) => console.log(err));
});

app.get('/purchases', (req, res) => {
  db.Purchase.findAll({
    attributes: ['product_id', 'quantity', 'price', 'isBundle', 'date']
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => console.log(err));
});

// app.get('/inventory', (req, res) => {
//   db.updateWithInventory()
//   .then((result) => console.log(result))
//   .then(() => res.end());
// })

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});

module.exports = app;