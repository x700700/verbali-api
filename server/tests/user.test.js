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


describe('## User APIs', () => {
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

    describe('# POST /auth/register', () => {
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

    describe('# PUT /users', () => {
        it('should update user details', (done) => {
            user.firstName += ' renamed';
            delete user.email;
            delete user.password;
            delete user.extra;
            const req = request(app).put('/users');
            req.cookies = cookies;
            req
                .send(user)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.nickName).to.equal(user.nickName);
                    expect(res.body.firstName).to.include('renamed');
                    user = res.body;
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
