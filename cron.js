var crontab = require('node-crontab');
var sendMessage = require('./sqs/sendMessage');
var weeklyProductPurchases = require('./server/weeklyProductPurchases');

var job1 = crontab.scheduleJob("59 23 * * *", function(){ 
  sendMessage();
  console.log("It's 23:59pm!");
});

var job2 = crontab.scheduleJob("0 7 * * 0", function(a) {
  weeklyProductPurchases();
  console.log("It's 7am!");
}, ["World"]);
