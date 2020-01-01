const chai = require('chai');
const chaiHttp = require('chai-http');
const randomstring = require('randomstring');
const app = require('../app');

const { assert } = chai;
const { expect } = chai;


// Configure chai
chai.use(chaiHttp);
chai.should();

function assertNotError(err, res) {
    if (err) {
        log.error(err.message);
        assert.fail(err);
    }
}

describe('Test Web', function () {
    this.timeout(10 * 1000);

    before(() => {
        process.env.NODE_ENV = 'test';
    });

    it('should get home page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                assertNotError(err, res);
                expect(res).to.have.status(200);
                done();
            });
    });

});
