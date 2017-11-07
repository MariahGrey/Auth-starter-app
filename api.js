const models = require("./models");
const routes = require("./routes");
// brings in models and routes for use here

module.exports.register = (server, options, next) => {
  server.bind({
    // server.bind takes all properties from the object passed in
    // and adds them to the server context(this) when inside
    // a "handler" function of a route configuration.
    // e.g. this.models === server.models
    models: models
  });
  // hapi plugins require a register export as a function
  // function will receive (server, options, next)
  // server - the server instance the plugin was registered to
  // options - any options the server has already been configured to
  // next - a function that will move to execute the next plugin
  // in the array of plugins registered

  server.route(routes);
  // adds each route config as an API endpoint
  // endpoint - an address and method combo that will trigger
  // a server function and provide a response back to the requester

  next();
  // a function that will move to execute the next plugin
  // in the array of plugins registered
};

module.exports.register.attributes = {
  name: "api",
  version: "0.0.1"
};
// hapi plugins are required to provide an export of
// register.attributes that contain a name and version to
// differentiate between other registered plugins
// this is to avoid registering duplicate plugins
