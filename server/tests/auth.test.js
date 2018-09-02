const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');
const utils = require('./utils');
// const config = require('../../config/config');


chai.config.includeStack = true;

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});


describe('## Auth APIs', () => {
    const itemsId = Math.random().toString(36).substring(7);
    const password = 'Asdf12';
    let user = {
        email: `!!__test-${itemsId}@dummy.com`,
        nickName: `!!__test-${itemsId}`,
        password: password,
        firstName: `test-${itemsId}`,
        lastName: 'Weisstest',
    };
    const loginReq = {
        email: user.email,
        password: user.password,
    };
    let cookies;

    describe('# POST /auth/login', () => {
        it('should return Authentication error', (done) => {
            request(app)
                .post('/auth/login')
                .send(loginReq)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.error.text).to.include('Bad credentials');
                    done();
                })
                .catch(done);
        });

        it('should register a new user', (done) => {
            request(app)
                .post('/auth/register')
                .send(user)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.email).to.equal(user.email);
                    expect(res.body.nickName).to.equal(user.nickName);
                    user = res.body;
                    done();
                })
                .catch(done);
        });

        it('should get valid session cookie', (done) => {
            request(app)
                .post('/auth/login')
                .send(loginReq)
                .expect(httpStatus.OK)
                .expect('set-cookie', /connect.sid/)
                .then((res) => {
                    cookies = utils.extractCookies(res);
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /users', () => {
        it('should delete user', (done) => {
            const req = request(app).delete('/users');
            req.cookies = cookies;
            req
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.email).to.equal(user.email);
                    expect(res.body.nickName).to.equal(user.nickName);
                    done();
                })
                .catch(done);
        });
    });

});
