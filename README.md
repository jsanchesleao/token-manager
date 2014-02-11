Token Manager
=============

Token manager is a module aimed to create, manage and expire access tokens.
The main use case is to validate authentication tokens.

Installation
------------

```bash
npm install token-manager
```

QuickStart
----------

```javascript
var tm = require('token-manager');

var tokenManager = new tm.TokenManager();

var myToken = new tm.Token({
    clientId: 'some_client',                //set client id
    tokenString: 'dG9rZW5tYW5hZ2VyCgo=',    //set token content
    expiration: 10 * 60 * 1000,             //set the expiration time, in milliseconds
    roles: ['admin']
});

tokenManager.put(myToken);                  //register the token

/* ... */

tokenManager.get('dG9rZW5tYW5hZ2VyCgo=');   //restores the token and refreshes its expiration time.
```

Every time you create a Token object, it's lifecycle starts, set to expire after a delimited amount of time.
When a given token is checked with TokenManager.get() method, it's lifecycle restarts.

If the expiration time for a given token has passed without any refresh, the token is set to expired,
raising an error the next time it's requested.


API
---

### Token

* constructor

```javascript
new Token({
    clientId: 'id',
    tokenString: 'abcd',
    expiration: 1000,
    roles: ['client', 'admin']
});
```

** clientId: A String containing the client id. Required.

** tokenString: A String containing the token data. Required.

** expiration: The expiration time for the token in milliseconds. Required.

** roles: An array containing roles associated with the clientId. Optional.

* getClientId()

Returns the given client id.

* getTokenString()

Returns the given token string

* getRoles()

Returns the given roles. An empty array is returned if no role was given.

* expire()

```javascript
token.expire();
```

Immediately stops the token's lifecycle and expires it.

* visit()

```javascript
token.visit();
```

Refreshes the lifecycle of the token, meaning it stops the current expiration cycle, and start another one.

* is(role)

```javascript
token.is('admin')
```
Returns true if the token contains a given role.


### TokenManager

* constructor

```javascript
new TokenManager();
```

* put(token);

```javascript
tokenManager.put( aToken );
```

Saves the token in the registry. Returns nothing. Blocking.

* get(tokenString);

```javascript
tokenManager.get( tokenString );
```

Checks for the token in the registry. It also refreshes the token lifecycle. Blocking. Returns a token object


Integration with token-manager-server
-------------------------------------

You can access a [token-manager-server](https://github.com/jsanchesleao/token-manager-server "TokenManagerServer") instance by using by using the client API provided out of the box:

```javascript
    var tm = require('token-manager')

    var client = new tm.TokenManagerClient({
        endpoint: 'http://yourserver/token',
        timeout: 30000                          // defaults to 10000
    });

    /* example of sending a token */
    client.put( new tm.Token({
        clientId: 'jeff',
        tokenString: 'abcd',
        expiration: 30000
    }), function(error, data){
        console.log('posted the token')
    });

    /* example of getting a token */
    client.get( 'abc', function(error, data){
        console.log('clientId is: ' + data.getClientId());
    });
```

### TokenManagerClient

* constructor

```javascript
new TokenManagerClient(config);
```

Accepts a config object with the following fields:

endpoint: a string with the complete tokenManagerServer endpoint
timeout: in milliseconds. Defaults to 10000.

* put(token, callback);

```javascript
tokenManagerClient.put( aToken, function(error, data){
    if(error) throw error;
    console.log(data);
});
```

Saves the token in the server. Returns a data object containing the same tokenString and clientId of the token passed.

* get(tokenString, callback);

```javascript
tokenManagerClient.get( tokenString, function(error, data){
    if(error) throw error;
    console.log(data);
});
```

Recover a token from the server. The data object returned contains tokenString and clientId.

The recovered token has no info about expiration time.
