module.exports = {
  // exporting route config object
  method: "GET",
  // the http method used to access this endoint
  path: "/api/users/{userId}",
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

      let userId = request.params.userId;
      // grabs the param "userId" from the request URL

      this.models.User
        .get(userId)
        // fetches the user by id found in the URl
        .then(result => reply(result))
        // sends the user found with the id in the http response
        .catch(err => reply(err));
      // sends the error if one occured in the http response
    }
  }
};
