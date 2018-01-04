'use strict';

module.exports = {
  generateRandomData
};

// Make sure to "npm install faker" first.
const faker = require('faker');

function generateRandomData(purchaseContext, events, done) {
  // generate data with Faker:
  // const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  // const email = Faker.internet.exampleEmail();
  // const password = Faker.internet.password();

  // const user_id = faker.random.number({min:1, max:100});
  // const product_id = faker.random.number({min:1, max:100});
  // const quantity = faker.random.number({min:5, max:10});
  // const price = faker.commerce.price();
  // const isBundle = faker.random.boolean();
  // const date = faker.date.between('2017-10-01', '2017-12-31');

  var purchases = [];
  // for(var i = 0; i < 10; i++){
    purchases.push({
      user_id: faker.random.number({min:1, max:10}),
      product_id: faker.random.number({min:1, max:10}),
      quantity: faker.random.number({min:5, max:10}),
      price: faker.commerce.price(),
      date: faker.date.between('2017-10-01', '2017-12-31'),
      isBundle: faker.random.boolean()
    })
  // }

  // add variables to virtual user's context:
  // userContext.vars.name = name;
  // userContext.vars.email = email;
  // userContext.vars.password = password;
  // purchaseContext.vars.user_id = user_id;
  // purchaseContext.vars.product_id = product_id;
  // purchaseContext.vars.quantity = quantity;
  // purchaseContext.vars.price = price;
  // purchaseContext.vars.isBundle = isBundle;
  // purchaseContext.vars.date = date;
  // console.log(Array.isArray(purchases));
  purchaseContext.vars.purchases = JSON.stringify(purchases);
  // console.log('*****', Array.isArray(purchaseContext.vars.purchases));
  // continue with executing the scenario:
  return done();
}