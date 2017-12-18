const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const db = require('../database/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('port', 3500);

app.post('/purchases', (req, res) => {
  // console.log(Array.isArray(req.body));
  db.Purchase.bulkCreate(req.body)
  .then(() => res.status(200).end());
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