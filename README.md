Foursquare results are accessed directly from the browser to Foursquare.

On the other hand, yelp requires Oath 2.0 authentication. For this reason, request for data from Yelp are first sent to Deployd through the '/api/yelp' uri. Deployd will see a `GET` request on 'localhost:2403/yelp' and then proceed to request data from the Yelp api with supplied keys from Yelp. 

Deployd runs an instance of MongoDb as part of its process and requires MongoDb to be installed prior to running. It stores data at `/api/data` in the same format as MongoDb. It must be opened from its own terminal window. Deployd is great for creating api quickly as it can all be done in the browser at `localhost:2403/dashboard`. This will open up the Deployd UI where you can create collections and define the data schemas for those collections. We are making use of the default User collection which stores user passwords in an encrypted fashion and provides easy methods for creating session id's and authentication sessions.

Signup saves to users collection at `localhost:2403/users` through `localhost:9000/api/users` proxy

Login actually `POST`'s to `localhost:2403/users/login` the username and password and the Deployd server responds with a session id, user id, and path to users collection.

Logout works the same as above, except it posts to `localhost:2403/users/logut`.

More info can be found here -> [Auth user](http://docs.deployd.com/docs/users/authenticating-users.md) 

Grunt launches the app with `grunt preview`. This process adds any `js` files within the /public folder, all the necessary front end libraries launches the server ( a Connect server with proxies for the Deployd api.), and watches for any changes to the `js` files. When it see's a change it will reload the open window where the app is. 

The proxy will reroute any call to `localhost:9000/api` to  `localhost:2403`. This allows us to get data from and to the Deployd server from within the running app on the client.

With Love:
 The Creature!