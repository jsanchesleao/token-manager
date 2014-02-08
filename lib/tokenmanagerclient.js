/**
 * Created by jeferson on 2/6/14.
 */
var request = require('request');

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
            callback(error, jsonBody);
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
            clientId: token.clientId,
            tokenString: token.tokenString,
            expiration: token.expiration
        }
    }, function(error, response, body){
        if( response.statusCode == 200 ){
            callback(error, body);
        }
        else{
            callback(Error(body.message), null);
        }
    });

}

exports.TokenManagerClient = TokenManagerClient;