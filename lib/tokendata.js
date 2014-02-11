function TokenData(data){
    validate(data);

    this.clientId = data.clientId;
    this.tokenString = data.tokenString;
    this.roles = data.roles || [];

}

TokenData.prototype.is = function(role){
    for(var i = 0; i < this.roles.length; i++){
        if( this.roles[i] == role ){
            return true;
        }
    }
    return false;
}


TokenData.prototype.getClientId = function(){
    return this.clientId;
}

TokenData.prototype.getTokenString = function(){
    return this.tokenString;
}

TokenData.prototype.getRoles = function(){
    return this.roles;
}


function validate(data){
    if( !data.clientId ){
        throw new Error('No clientId field on token creation')
    }
    if( !data.tokenString ){
        throw new Error('No tokenString field on token creation')
    }
    if( data.roles && data.roles.constructor != [].constructor){
        throw new Error('Roles field must be an array')
    }
}

exports.TokenData = TokenData;
