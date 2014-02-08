/*
 * Demonstrates how to use the client api.
 * You should have the token-manager-server running on port 3002 to run this example
 *
 * check https://github.com/jsanchesleao/token-manager-server for more info on the server
 */
var Client = require('./../lib/tokenmanagerclient').TokenManagerClient;
var Token  = require('./../lib/token').Token;


var token = {clientId: 'jeff', tokenString: 'abc', expiration: 60000};

var client = new Client({
    endpoint: 'http://localhost:3002/token',
    timeout: 20000
});


client.put(token, function(err, data){
    if(err) throw err;
    console.log('POSTED token: ' + data.tokenString);

    client.get( 'abc', function(error, data){
        if(error) throw error;
        console.log("Token's client: " + data.clientId);
    } )

})

