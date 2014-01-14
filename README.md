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
    expiration: 10 * 60 * 1000              //set the expiration time, in milliseconds
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
    expiration: 1000
});
```

** clientId: A String containing the client id. Required.
** tokenString: A String containing the token data. Required.
** expiration: The expiration time for the token in milliseconds. Required.

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

Checks for the token in the registry. It also refreshes the token lifecycle. Blocking.