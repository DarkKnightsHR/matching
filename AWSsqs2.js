
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/732562083814/client-to-matching.fifo',
  handleMessage: (message, done) => {
      let receiptHandle = message.ReceiptHandle;
      let MD5OfBody = message.MD5OfBody;
      let body = JSON.parse(message.Body);
    console.log('message >>>>> ', body);
    done();
  }
});
 
app.on('error', (err) => {
  console.log('error >>>>>>> ', err.message);
});
 
app.start();


