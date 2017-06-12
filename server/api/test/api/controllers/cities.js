var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

    describe('cities', function() {

        describe('GET /country/cities', function() {

            it('should fail without country parameter', function(done) {

                request(server)
                    .get('/country/cities')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(function(err, res) {
                        should.exist(err);
                        done();
                    });
            });

            it('should return a collection of 8 cities', function(done) {

                request(server)
                    .get('/country/cities')
                    .query({country: 'brazil'})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.body.items.length.should.eql(8);
                        res.body.total.should.eql(100);
                        res.body.page.should.eql(1);
                        done();
                    });
            });

            it('should return a collection of 8 cities and accept page', function(done) {

                request(server)
                    .get('/country/cities')
                    .query({country: 'brazil', page: 2})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.body.items.length.should.eql(8);
                        res.body.total.should.eql(100);
                        res.body.page.should.eql(2);
                        done();
                    });
            });

        });

    });

});
