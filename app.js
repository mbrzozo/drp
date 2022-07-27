require('dotenv').config();
// Set Genesys cloud objects
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

// Import library to use for input in NPM
const prompt = require('prompt');

// Get client credentials from environment variables
const CLIENT_ID = process.env.GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GENESYS_CLOUD_CLIENT_SECRET;
const ORG_REGION = process.env.GENESYS_CLOUD_REGION; // eg. us_east_1

let routingApi = new platformClient.RoutingApi();

// Properties of input
let schema = {
    properties: {
        queueName: {
            message: 'Name of queue',
            required: true
        }
    }
};

// Start the prompt
function inputQueueName() {
    return new Promise((resolve, reject) => {
        prompt.start();
        prompt.get(schema, (_err, result) => {
            if (_err) reject(err);

            resolve(result.queueName);
        });
    });
}

function getQueueId(name){
    return routingApi.getRoutingQueues({
                pageSize: 100, pageNumber: 1, sortBy: 'name', name: queueName})
    .then((data) => {
        let queues = data.entities;

        if (queues.length < 1) {
            throw new Error('Queue not found.');
        } else if (queues.length > 1) {
            console.log('Found more than one queue with the name. Getting the first one.')
        }
            
        queueId = queues[0].id;
        console.log('queueId: ' + queueId);
    })
    .catch((err) => console.error(err));
}

// Set environment
const environment = platformClient.PureCloudRegionHosts[ORG_REGION];
if(environment) client.setEnvironment(environment);

client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
.then(() => {
    console.log('Authentication successful!');
    
    return inputQueueName();
})
 .then((_queueName) => {
    queueName = _queueName;

    return getQueueId(queueName);
})


/*.then(() => {
    return getOnQueueAgentsCount();
})
.then((count) => {
    console.log(`Number of On-Queue Agents (${queueName}): ${count}`);
})
.catch((err) => console.log(err)); */
