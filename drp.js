// Set Genesys cloud objects
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

// Import library to use for input in NPM
const prompt = require('prompt');

// Get client credentials from environment variables
const CLIENT_ID = process.env.GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GENESYS_CLOUD_CLIENT_SECRET;
const ORG_REGION = process.env.GENESYS_CLOUD_REGION; // eg. us_east_1

//console.log(process.env.GENESYS_CLOUD_CLIENT_ID);

let routingApi = new platformClient.RoutingApi();