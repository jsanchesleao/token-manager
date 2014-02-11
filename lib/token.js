var TokenData = require('./tokendata').TokenData;

function Token(data){
    validate(data);

    this.tokenData = new TokenData({
        clientId: data.clientId,
        tokenString: data.tokenString,
        roles: data.roles || []
    });

    this.expiration = data.expiration;

    this.expired = false;
    this.expirationCycle = null;

    this.startExpiration();
}

Token.prototype.getClientId = function(){
    return this.tokenData.getClientId();
}

Token.prototype.getTokenString = function(){
    return this.tokenData.getTokenString();
}

Token.prototype.getRoles = function(){
    return this.tokenData.getRoles();
}

Token.prototype.getExpiration = function(){
    return this.expiration;
}

Token.prototype.startExpiration = function(){
    if( this.expired ){
        return;
    }
    var self = this;

    this.expirationCycle = setTimeout(function(){
        self.expire();
    }, this.expiration)
}

Token.prototype.expire = function(){
    if( !this.expired ){
        this.expired = true;
        this.expirationCycle.close();
    }
}

Token.prototype.visit = function(){
    if( this.expired ){
        throw new Error('The requested token has expired');
    }
    this.expirationCycle.close();
    this.startExpiration();
}

Token.prototype.is = function(role){
    return this.tokenData.is(role);
}

function validate(data){
    if( !data.expiration){
        throw new Error('No expiration field on token creation')
    }
    if( data.expiration <= 0 ){
        throw new Error('Expiration field must be a positive number')
    }
}

exports.Token = Token;
