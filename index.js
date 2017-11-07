const hapi = require("hapi");
const hapiAuthJwt = require("hapi-auth-jwt2");
const api = require("./api");
// bringing in hapi to set up server,
// bringing in our api plugin to register
// api end points (routes)

const server = new hapi.Server();
// initializing a new server instance

server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
    // allows requests from all domains/origins
    // anyone can send a request to this api
  },
  router: {
    stripTrailingSlash: true
    // removes ending slash from incoming request URLs
  }
});
// modifying server settings

server
  .register([
    hapiAuthJwt,
    {
      register: api
    }
  ])
  .then(() => {
    server
      .start()
      .then(() => console.log(`Server started at: ${server.info.uri}`))
      .catch(err => console.log(err));
    // turning on the server, endpoints in api are now reachable
  })
  .catch(err => console.log(err));
//takes plugins in as an array, then executes each plugin
// plugin is a snippet of code that modifies server settings
// most often is a prebuilt package we install
