/**
 * Created by jeferson on 1/14/14.
 */
function TokenManager(){
    this.tokens = {}
}

TokenManager.prototype.put = function(token){
    this.tokens[ token.tokenString ] = token;
}

TokenManager.prototype.get = function(tokenString){
    var token = this.tokens[tokenString]
    if( !token ){
        throw new Error('the requested token was not registered');
    }
    if( token.expired ){
        delete this.tokens[ tokenString ]
    }
    token.visit()
    return token;
}

exports.TokenManager = TokenManager