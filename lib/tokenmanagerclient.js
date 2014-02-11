var request = require('request');
var TokenData = require('./tokendata').TokenData;

function TokenManagerClient(conf){
    this.endpoint = conf.endpoint;
    this.timeout = conf.timeout || 10000;
}

TokenManagerClient.prototype.get = function(tokenString, callback){
    request({
        url: this.endpoint + '?tokenString='+tokenString,
        method: 'GET',
        timeout: this.timeout
    }, function(error, response, body){
        var jsonBody = JSON.parse(body);
        if( response.statusCode == 200){
            callback(error, new TokenData(jsonBody) );
        }
        else{
            callback(Error(jsonBody.message), null);
        }
    });
}

TokenManagerClient.prototype.put = function(token, callback){
    request({
        uri: this.endpoint,
        method: 'POST',
        timeout: this.timeout,
        json: {
            clientId: token.getClientId(),
            tokenString: token.getTokenString(),
            expiration: token.getExpiration(),
            roles: token.getRoles()            
        }
    }, function(error, response, body){
        if(error){
            callback(error, null);
        }
        else if( response.statusCode == 200 ){
            callback(error, new TokenData(body) );
        }
        else{
            callback(Error(body.message), null);
        }
    });

}

exports.TokenManagerClient = TokenManagerClient;
