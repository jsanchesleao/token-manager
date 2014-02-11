var tm = require('./lib/main');


var client = new tm.TokenManagerClient({
    endpoint: 'http://localhost:3001/token',
    timeout: 10000
});


var token = new tm.Token({
    clientId: 'jeff',
    tokenString: 'abc',
    expiration: 300000,
    roles: ['owner']
})

client.put(token, function(err, data){
    if( err ) throw err;
    console.log( data.is('owner') );
});
