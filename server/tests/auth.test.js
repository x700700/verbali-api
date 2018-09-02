const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');
// const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Auth APIs', () => {
    const validUserCredentials = {
        email: 'x700700@gmail.com',
        password: 'Asdf12',
    };

    const invalidUserCredentials = {
        email: 'nobady@dummy.com',
        password: 'Eiyn',
    };

    describe('# POST /auth/login', () => {
        it('should return Authentication error', (done) => {
            request(app)
                .post('/auth/login')
                .send(invalidUserCredentials)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.error.text).to.include('Invalid email');
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

});
