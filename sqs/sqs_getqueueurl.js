// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// load credentials and set the region from the JSON file
AWS.config.loadFromPath('../config.json');

// Create SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  QueueName: 'update_inventory'
};

sqs.getQueueUrl(params, function(err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.QueueUrl);
  }
});