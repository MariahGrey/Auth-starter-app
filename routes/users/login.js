module.exports = {
  // exporting route config object
  method: "POST",
  // the http method used to access this endoint
  path: "/api/users/login",
  // the request url used to access this endpoint
  // method and path belong together
  config: {
    // setting for how the request is handled after being received

    auth: {
      mode: "optional"
      // auth.mode - if set to optional, the route will be accesible
      // without any authentication header
    },
    handler: function(request, reply) {
      // the function that runs when a request is received
      // to the endpoint, handler(request, reply){}
      // request - object containing all details (data, params, etc)
      // reply - function that allows us to send an http response
      // with data or a message to the requester

      // grab the email and password values from the request.payload
      // (this is the body sent in the request)
      let { email, password } = request.payload;
      this.models.User
        .filter({ email: email }) // filter users by the login email
        .then(users => {
          if (users.length === 0) {
            throw "Email and password combo is invalid";
            // if there are 0 users with that email,
            // throw error to catch block
          }
          let [user] = users;
          // grab the user in the first index of users array

          return user.comparePassword(password);
          // run the compare password function on the user doc found
          // with the login email and compare the login password
          // to the stored secure hash password value
        })
        .then(user => {
          if (!user) {
            throw "Email and password combo is invalid";
            // if the value of user is false, throw an error
            // to the catch block
          }

          delete user.password;
          // remove password before returning jwt

          return user.generateJWT();
          // generate a json web token with the
          // user method generateJWT()
        })
        .then(token => reply(token))
        .catch(err => {
          console.log(err), reply(err);
        });
    }
  }
};
