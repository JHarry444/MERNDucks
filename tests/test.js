const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { DUCK_URL } = require('../config/config.json');
chai.use(chaiHttp);

const mongoose = require('mongoose');

describe('trainers', function () {
    this.afterAll('close connections', function () {
        mongoose.disconnect()
    });

    describe('#hello', function () {
        it('Should return Hello, World!', function (done) {
            chai.request(app).get(`${DUCK_URL}/getAll`).end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.property('status', 200);
                done();
            });
        });
    });
});