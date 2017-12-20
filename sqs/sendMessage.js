var db = require('../database/index');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// load credentials and set the region from the JSON file
AWS.config.loadFromPath('../config.json');

// Create SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

db.updateWithInventory((data) => {

  console.log('***', data);

  var params = {
    DelaySeconds: 1,
    MessageAttributes: {
      "DailyInventoryUpdate": {
        DataType: "String",
        StringValue: JSON.stringify(data),
      }
    },
    MessageBody: "Update purchases data with Inventory.",
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/416725805262/update_inventory"
  }

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });

});

   //  "Title": {
   //    DataType: "String",
   //    StringValue: "The Whistler"
   //  },
   //  "Author": {
   //    DataType: "String",
   //    StringValue: "John Grisham"
   //  },
   //  "WeeksOn": {
   //    DataType: "Number",
   //    StringValue: "6"
   // }
 //},
 // MessageBody: "Information about current NY Times fiction bestseller for week of 12/18/2017.",

