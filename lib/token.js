/**
 * Created by jeferson on 1/14/14.
 */
function Token(data){
    validate(data);

    this.clientId = data.clientId;
    this.tokenString = data.tokenString;
    this.expiration = data.expiration;

    this.expired = false;
    this.expirationCycle = null;

    this.startExpiration();
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

function validate(data){
    if( !data.clientId ){
        throw new Error('No clientId field on token creation')
    }
    if( !data.tokenString ){
        throw new Error('No tokenString field on token creation')
    }
    if( !data.expiration){
        throw new Error('No expiration field on token creation')
    }
    if( data.expiration <= 0 ){
        throw new Error('Expiration field must be a positive number')
    }
}

exports.Token = Token;