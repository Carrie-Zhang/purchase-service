const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const faker = require('faker');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
  // this.timeout(5000);
  describe('/purchases', () => {

    // GET - list all purchases
    it('should return all purchases', () => {
      return chai.request(app)
      .get('/purchases')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
    });

    // GET - Invalid path
    it('should return Not Found', () => {
      return chai.request(app)
      .get('/INVALID_PATH')
      .then((res) => {
        throw new Error('Path exists!');
      })
      .catch((err) => {
        expect(err).to.have.status(404);
      });
    });

    // POST - Add new purchases
    it('should add new purchases', () => {
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

      return chai.request(app)
        .post('/purchases')
        .send(purchase)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
        });
      });

    // POST - Bad request
    // it('should return bad require', () => {
    //   var purchase = [];
    //   // for(var i = 0; i < 10; i++){
    //     purchase.push({
    //       user_id: faker.random.number({min:1, max:10}),
    //       product_id: faker.random.number({min:1, max:10}),
    //       quantity: faker.random.number({min:5, max:10}),
    //       price: faker.commerce.price(),
    //       date: faker.date.between('2017-10-01', '2017-12-31'),
    //       isBundle: faker.random.boolean()
    //     })
    //   // }

    //   return chai.request(app)
    //   .post('/purchases')
    //   .type('form')
    //   .send(purchase)
    //   .then((res) => {
    //     throw new Error('Invalid content types!')
    //   })
    //   .catch((err) => {
    //     expect(err).to.have.status(400);
    //   });
    // // done();
    // });

    });
  });
