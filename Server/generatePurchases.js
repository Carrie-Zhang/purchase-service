const fs = require('fs');
const faker = require('faker');
const path = require('path');

function generatePurchases() {

  var purchases = [];

  for (var id = 0; id < 10; id++) {

    purchases.push({
      id: id,
      user_id: faker.random.number(10),
      product_id: faker.random.number(10),
      quantity: faker.random.number({min:5, max:10}),
      price: faker.commerce.price(),
      date: faker.date.between('2017-10-01', '2017-12-31'),
      isBundle: faker.random.boolean()
    })
  }

  return purchases;

  fs.writeFile(path.join(__dirname + '/../Utils/fakeData.json'), JSON.stringify(purchases), function() {
    console.log('purchases data generated successfully!');
  });

}

module.exports = generatePurchases;
