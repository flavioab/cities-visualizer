var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

    describe('country', function() {

        describe('GET /country', function() {

            it('should return a list of all countries', function(done) {

                request(server)
                    .get('/country')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.body.length.should.eql(244);
                        done();
                    });
            });

        });

    });

});
