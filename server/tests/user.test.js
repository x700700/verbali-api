const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
/*
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});
*/

const itemsId = Math.random().toString(36).substring(7);
describe('## User APIs', () => {
    let user = {
        email: `!!__test-${itemsId}@dummy.com`,
        nickName: `!!__test-${itemsId}`,
        password: 'Asdf12',
        firstName: `test-${itemsId}`,
        lastName: 'Weisstest',

    };
    const renamedUserNickName = `!!__tst-renamed-${itemsId}`;

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
    });

    describe('# GET /users/:userId', () => {
        it('should get user details', (done) => {
            request(app)
                .get(`/users/${user.id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.email).to.equal(user.email);
                    expect(res.body.nickName).to.equal(user.nickName);
                    done();
                })
                .catch(done);
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            request(app)
                .get('/users/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.message).to.equal('Not Found');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /users/:userId', () => {
        it('should update user details', (done) => {
            user.email = renamedUserNickName;
            const userId = user.id;
            delete user.id;
            delete user.createdAt;
            delete user.modifiedAt;
            request(app)
                .put(`/users/${userId}`)
                .send(user)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.email).to.equal(renamedUserNickName);
                    expect(res.body.nickName).to.equal(user.nickName);
                    user = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /users/', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/users')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });

        it('should get all users (with limit and skip)', (done) => {
            request(app)
                .get('/users')
                .query({ limit: 10, skip: 1 })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /users/', () => {
        it('should delete user', (done) => {
            request(app)
                .delete(`/users/${user.id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.email).to.equal(renamedUserNickName);
                    expect(res.body.nickName).to.equal(user.nickName);
                    done();
                })
                .catch(done);
        });
    });
});
