const thinky = require("thinky");
// imports thinky to setup a database connection

const db = thinky({
  db: "authWalkThrough"
});
// builds and configures that database connection
// and starts the connection (turns it on). this is
// what makes your server blow up if rethinkdb isn't running

let User = require("./user")(db);
// bringing in the user model function and calling the function
// passing in the db instance, return value to the variable User
// is the configured db model

module.exports = {
  User: User
};
// exports the models as properties of the module
