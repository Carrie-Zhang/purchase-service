const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const faker = require('faker');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
  describe('/purchases', () => {
    it('responds with status 200', (done) => {
      var purchase = [];
      for(var i = 0; i < 10; i++){
        purchase.push({
          user_id: faker.random.number({min:1, max:10}),
          product_id: faker.random.number({min:1, max:10}),
          quantity: faker.random.number({min:5, max:10}),
          price: faker.commerce.price(),
          date: faker.date.between('2017-10-01', '2017-12-31'),
          isBundle: faker.random.boolean()
        })
      }
        // let userId = faker.random.number({min:1, max:500});
        // let productId = faker.random.number({min:1, max:500});
        // let quantity = faker.random.number({min:5, max:10});
        // let price = faker.commerce.price();
        // let date = faker.date.between('2017-10-01', '2017-12-31');
        // let isBundle = faker.random.boolean();
        chai.request(app)
          //.post(`/purchases?user_id=${userId}&product_id=${productId}&quantity=${quantity}&price=${price}&date=${date}&isBundle=${isBundle}`)
          .post('/purchases')
          .send(purchase)
          .end((err, res) => {
            expect(res).to.have.status(200);
        });
    done();
    });
  });
});
