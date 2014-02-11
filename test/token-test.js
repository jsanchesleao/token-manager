/**
 * Created by jeferson on 1/14/14.
 */
var Token= require('../lib/main').Token;
var assert = require('assert');

describe('Token', function(){
    describe('structure', function(){
        it('throws error if no clientId was passed', function(){
            try{
                new Token({
                    tokenString: 'abc',
                    expiration: 100
                });
                assert.fail();
            }
            catch(e){
                assert.equal(e.message, 'No clientId field on token creation');
            }
        });

        it('throws error if no tokenString was passed', function(){
            try{
                new Token({
                    clientId: 'test',
                    expiration: 100
                });
                assert.fail();
            }
            catch(e){
                assert.equal(e.message, 'No tokenString field on token creation');
            }
        });

        it('throws error if no expiration time was passed', function(){
            try{
                new Token({
                    clientId: 'test',
                    tokenString: 'abc'
                });
                assert.fail();
            }
            catch(e){
                assert.equal(e.message, 'No expiration field on token creation');
            }
        });

        it('throws error if roles field is not an array', function(){
            try{
                new Token({
                    clientId: 'test',
                    tokenString: 'abc',
                    expiration: 3000,
                    roles: 'not an array'
                });
                assert.fail();
            }
            catch(e){
                assert.equal(e.message, 'Roles field must be an array');
            }

        });

        it('has a positive number as expiration time', function(){
            try{
                new Token({
                    clientId: 'test',
                    tokenString: 'abc',
                    expiration: -1
                });
                assert.fail();
            }
            catch(e){
                assert.equal(e.message, 'Expiration field must be a positive number');
            }
        });
    })
    describe('expiration', function(){
        it('expires after a given amount of time in milliseconds', function(done){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 100
            });
            setTimeout(function(){
               assert.ok( token.expired );
               done();
            }, 110);
        });

        it('refreshes the expiration time if visited', function(done){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 100
            });
            setTimeout(function(){
                token.visit();
                setTimeout(function(){
                    assert.ok( !token.expired );
                    done();
                }, 20);
            }, 90);
        });

        it('allows imperative expiration at any time', function(done){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 10000000
            });
            token.expire();
            assert.ok( token.expired );
            done();
        });
    });
    describe('#visit()', function(){
        it('throws error if visit an expired token', function(done){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 1
            });
            setTimeout(function(){
                try{
                    token.visit();
                    assert.fail();
                }
                catch(e){
                    assert.equal(e.message, 'The requested token has expired');
                    done();
                }
            },10);
        })
    })

    describe('Roles', function(){
        it('Creates an empty array if no roles field is passed during creation', function(){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 3000
            });
            assert.equal(token.getRoles().length, 0);
        });

        it('Checks if token contains arbitrary roles', function(){
            var token = new Token({
                clientId: 'test',
                tokenString: 'abc',
                expiration: 3000,
                roles: ['admin']
            });
            assert.ok( token.is('admin') );
            assert.ok( !token.is('client') );
        })
    });
})
