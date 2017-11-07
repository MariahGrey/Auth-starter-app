module.exports = {
  // exporting route config object
  method: "POST",
  // the http method used to access this endoint
  path: "/api/users",
  // the request url used to access this endpoint
  // method and path belong together
  config: {
    // setting for how the request is handled after being received

    // auth.mode - if set to optional, the route will be accesible
    // without any authentication header
    handler: function(request, reply) {
      // the function that runs when a request is received
      // to the endpoint, handler(request, reply){}
      // request - object containing all details (data, params, etc)
      // reply - function that allows us to send an http response
      // with data or a message to the requester

      let user = new this.models.User(request.payload);
      // creating a new instance of a user from the User db model
      // will validate any data passed in by comparing to the
      // modelSchema

      user
        .save()
        // saves the new user record to the database
        .then(user => reply(user))
        // sends the saved user record in the http response
        .catch(err => reply(err));
      // sends the error if one occured in the http response
    }
  }
};
