const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');
// const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Auth APIs', () => {
    const validUserCredentials = {
        username: 'x700700@gmail.com',
        password: 'Asdf12',
    };

    const invalidUserCredentials = {
        username: 'nobady@gmail.com',
        password: 'fuckOff',
    };

    describe('# POST /auth/login', () => {
        it('should return Authentication error', (done) => {
            request(app)
                .post('/auth/login')
                .send(invalidUserCredentials)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.message).to.equal('Authentication error');
                    done();
                })
                .catch(done);
        });

        it('should get valid session cookie', (done) => {
            request(app)
                .post('/auth/login')
                .send(validUserCredentials)
                .expect(httpStatus.OK)
                .then(() => {
                        done();
                })
                .catch(done);
        });
    });

    describe('# GET /auth/random-number', () => {
        it('should fail to get random number because of missing Authorization', (done) => {
            request(app)
                .get('/auth/random-number')
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.message).to.equal('Unauthorized');
                    done();
                })
                .catch(done);
        });

        it('should fail to get random number because of wrong token', (done) => {
            request(app)
                .get('/auth/random-number')
                .set('Authorization', 'Bearer inValidToken')
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.message).to.equal('Unauthorized');
                    done();
                })
                .catch(done);
        });
    });
});
