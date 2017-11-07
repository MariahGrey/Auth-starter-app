const bcrypt = require("bcrypt-as-promised");
// import bcrypt for password utility functions
// such as generating salts and hashes, and comparing
// plain-text passwords to secure hash values
const jwt = require("jsonwebtoken");

module.exports = db => {
  // model is exported as a function, db instance is passed in
  // as the parameter

  let User = db.createModel("User", {
    // creating a user db model, which is a definition of what a
    // particular data type will look like

    // db.createModel takes in 3 params, 1 is optional
    // createModel(modelName, modelSchema, modelOptions(optional))
    // modelName - name of the db table/collection
    // the record will be stored in
    // modelSchema - the shape/definition of what the data
    // will look like
    // modelOptions - alternate settings to change the behavior
    // of how our data is validated, saved or queried (optional)

    email: db.type.string().required(),
    password: db.type.string().required()
  });

  User.define("generatePassword", function() {
    return bcrypt
      .genSalt(10) //generate a salt
      .then(salt => bcrypt.hash(this.password, salt)) //generate a hash w/ input password and salt
      .then(hash => Object.assign(this, { password: hash })) //update user with hash as password field value
      .catch(err => err); // catch any thrown errors and return
  });
  // define a method that can be called on at all user documents
  // that will take the password value and transform it into a secure
  //hash value that is safe to store in the database.

  User.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password) // compares the plain text password to the hashed password through an algorithm
      .then(auth => (auth ? this : false)) // return "this" (the user doc) if auth is true, else return false
      .catch(bcrypt.MISMATCH_ERROR, () => "Email and password combo is invalid") // catch any password errors and return custom error message
      .catch(err => err); // catch and return any other errors
  });
  // define a method that can be called on at all user documents
  // that will take the password sent to the api and compare it
  // to the password hash stored on the user database record.

  User.define("generateJWT", function() {
    return jwt.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
      // defines a method to transform the user data into a secure
      // access token to our API,
      // calls the jwt.sign(data, secretKey, optionsObject)
      // returns large, random, encoded string
    });
  });

  User.pre("save", function(next) {
    User.filter({ email: this.email }).then(users => {
      if (users.length > 0) {
        return next("Email and password combo is invalid.");
        // check if users array that have the same email address is
        // longer than 0, if longer than 0, proceed with error.
      }

      return this.generatePassword() // execute generatePassword() on doc
        .then(() => next()) // continue to allow doc to be saved
        .catch(err => next(err)); // pass error to stop doc from saving
      // define event hook that will call any methods needed to run
      // before a new user doc is saved to the database.
    });
  });

  return User;
  // return the model from the function
};
