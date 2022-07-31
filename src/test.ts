//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
describe('BoatSlips', () => {
  // Consts
  const
  successCode = 200,
   boatSlip = {
      slipNumber: '1',
      vacant: 'true',
      vesselName: "",
    };

  /*
  * Test for /GET
  */
  describe('/GET BoatSlips', () => {
    it('it should GET all the boat slips', done => {
      chai.request(server).get('/boat-slips').res.should.have.status(successCode);
      chai.request(server).get('/boat-slips').res.body.should.be.a('array');
      chai.request(server).get('/boat-slips').res.body.length.should.be.eql(3);
      done();
    });
  });
})