const app = require('./server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { trainerUrl } = require('../config/config.json');
chai.use(chaiHttp);

// describe('trainers', function () {
//     describe('#hello', function () {
//         it('Should return Hello, World!', (done) => {
//             chai.request(app).get(`${trainerUrl}/hello`).end(function (err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.property('status', 200);
//                 expect(res).to.have.property('text', 'Hello, World!');
//                 done();
//             });
//         })
//     })
// })


// chai.request(app).get(`${trainerUrl}/getAll`).end(function (err, res) {
//     expect(err).to.be.null;
//     expect(res).to.have.property('status', 200);
//     expect(res).to.have.property('text', '["JH","Chris","Rhys","Dale","Bob"]');
// });
console.log(process.env.NODE_ENV);