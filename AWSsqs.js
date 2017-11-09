// const Promise = require('bluebird');
const AWS = require('aws-sdk');
// AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.loadFromPath('./config.json');
const dbmysql = require('./mysql');

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

let msgCount = 0;
var recMes = () => sqs.receiveMessage(params, function(err, data) {
    if (err) {
        console.log('ERRROR>>>',err, err.stack); // an error occurred
        if (msgCount < msgNo) {
            msgCount++;
            setTimeout(recMes, 1000);  
        }
    } else {
        processMessage1(data.Messages[0], params.QueueUrl, function (err, res) {
           if (err) {
               console.log('Error processMessage1: ', err);
               if (msgCount < msgNo) {
                    msgCount++;
                    setTimeout(recMes, 1000);  
                }
           } else {
               console.log('done delete: ', res);
               if (msgCount < msgNo) {
                    msgCount++;
                    recMes();  
                }
            };
        });
        console.log('SUCCESS >>>>  ',data.Messages[0].Body);           // successful response
    }
});
// setInterval(recMes, 100);
// for (let k = 0; k < 1; k++) {
    //     setTimeout(recMes, 1000); // for development work
    // }
    
    let msgNo = 1000;
    // call once to start
recMes();


var processMessage1 = function (message, queueUrl, cb) {
    var deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle
    };

    let a = JSON.parse(message.Body);
    console.log('Rider request from: ', a["pickup-x"]);
    // let date = new Date();
    // let time = date.time();
    let riderID = `"${a.rider_id}"`;
    let queryInputs = [riderID, a.zone, a["pickup-x"], a["pickup-y"], a["dropoff-x"], a["dropoff-y"], a.distance, a["base-price"], a["final-price"], a["surge-ratio"]];
    let queryString = `INSERT INTO client (rider_id, zone, pickupx, pickupy, dropoffx, dropoffy, distance, baseprice, finalprice, surgeratio, tomatchat) VALUES (${queryInputs.join(',')}, NOW())`;
    // console.log('queryInputs: ', queryInputs);
    // console.log('queryString: ', queryString);
    recMesInsert(queryString, function(err, result) {
        if (err) {
            console.log('There was an error in recMesInsert. err: ', err);
        } else {
            console.log('insert successful. count: ', msgCount);
        }
    })


    // INSERT INTO client (rider_id, zone, pickupx, pickupy, dropoffx, dropoffy, distance, baseprice, finalprice, surgeratio, created_at) VALUES 
    // ("2c8fa85c-a380-4d1c-935b-1dcf3f849440", 46, 5186, 4628, 4496, 385, 6017, 13.24, 13.24, 1, '2017-11-04 00:03:31');

    // console.log('QueueUrl: ', deleteParams.QueueUrl);
    // console.log('ReceiptHandle: ', deleteParams.ReceiptHandle);
  
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

function recMesInsert(query, callback) {
	dbmysql.addBoReq(query, callback);
}

