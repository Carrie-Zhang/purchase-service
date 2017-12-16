const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const db = require('../Database/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.set('port', 3500);

app.post('/purchases', (req, res) => {
  console.log(Array.isArray(req.body));
  db.Purchase.bulkCreate(req.body)
  .then(() => res.end());
});

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});