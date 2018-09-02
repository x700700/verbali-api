const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');
const utils = require('./utils');


chai.config.includeStack = true;

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});


describe('## Verbal APIs', () => {
    const itemsId = Math.random().toString(36).substring(7);
    const password = 'Asdf12';
    let user = {
        email: `!!__test-${itemsId}@dummy.com`,
        nickName: `!!__test-${itemsId}`,
        password: password,
        firstName: `test-${itemsId}`,
        lastName: 'Weisstest',
    };
    let cookies;


    describe('# POST /auth/register & login', () => {
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

        it('login', (done) => {
            request(app)
                .post('/auth/login')
                .send({
                    email: user.email,
                    password: password,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    cookies = utils.extractCookies(res);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /verbals', () => {
        it('should get all verbals', (done) => {
            const req = request(app).get('/verbals');
            req.cookies = cookies;
            req
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });

        /*
        it('should get all verbals (with limit and skip)', (done) => {
            const req = request(app).get('/verbals');
            req.cookies = cookies;
            req
                .query({ limit: 10, skip: 1 })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
        */
    });

});
