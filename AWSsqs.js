// const Promise = require('bluebird');
const AWS = require('aws-sdk');
// AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.loadFromPath('./config.json');

// var credentials = new AWS.SharedIniFileCredentials({profile: 'client'});
// AWS.config.credentials = credentials;

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
    QueueUrl: "https://sqs.us-west-2.amazonaws.com/732562083814/client-to-matching.fifo",
    MaxNumberOfMessages: 1,
    // MessageAttributeNames: [
    //     "pickup-x","pickup-y","dropoff-x","dropoff-y","distance","final-price","zone","created_at","rider_id","surge-ratio"
    // //   'STRING_VALUE',
    // //   /* more items */
    // ],
    // ReceiveRequestAttemptId: 'STRING_VALUE',
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20
};

var recMes = () => sqs.receiveMessage(params, function(err, data) {
    if (err) {
        console.log('ERRROR>>>',err, err.stack); // an error occurred
    } else {
        processMessage1(data.Messages[0], params.QueueUrl, function (err, res) {
            console.log('done delete: ', res)
        });
        console.log('SUCCESS >>>>  ',data);           // successful response
        
    }
});
// setInterval(recMes, 100);
setTimeout(recMes, 1000); // for development work


var processMessage1 = function (message, queueUrl, cb) {
    var deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle
    };
    console.log('QueueUrl: ', deleteParams.QueueUrl);
    console.log('ReceiptHandle: ', deleteParams.ReceiptHandle);
  
    sqs.deleteMessage(deleteParams, function (err, res) {
      if (err) {
          console.log('in deletemessage err: ', err);
          return cb(('SQS delete message failed: ' + err.message));
      } else {
          console.log('in delete message success: ', res);
          cb(null, res);
      }
    });
  };



