/**
 * Created by jeferson on 1/14/14.
 */
var TokenManager = require('../lib/main').TokenManager;
var Token= require('../lib/main').Token;


var token_manager = new TokenManager()
var assert = require('assert');

describe('Token Manager', function(){
    describe('The Registry', function(){
        it('associates tokens with client ids', function(){
            var token = new Token({
                clientId: 'test_client',
                tokenString: 'abc',
                expiration: 10000
            });
            token_manager.put(token);
            var result = token_manager.get('abc');
            assert.equal( token.clientId, result.clientId );
        });

        it('throws an error if the requested token was not registered', function(){
            try{
                token_manager.get('not_registered');
                assert.fail();
            }
            catch(err){
                assert.equal(err.message, 'the requested token was not registered');
            }
        });

        it('returns an error if the token has expired', function(done){
            var token = new Token({
                clientId: 'expired',
                tokenString: 'expired_token',
                expiration: 1000
            });
            token_manager.put(token);
            token.expire();
            setTimeout(function(){
                try{
                    token_manager.get('expired_token');
                    assert.fail();
                }
                catch(err){
                    assert.equal(err.message, 'The requested token has expired');
                    done();
                }
            }, 10);
        })
    })
})