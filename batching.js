const dbmysql = require('./mysql');
const CronJob = require('cron').CronJob;
const Match = require('./matchAlgo');
const FakeCar = require('./fakeCars.js');


let job = new CronJob('00,10,20,30,40,50 * * * * *', function() {
  console.log('You will see this message every 10 seconds');
  grabBatch((el) => console.log('callback in grabBatch'));
}, null, true, 'America/Los_Angeles');

job.start();

function grabBatch(callback) {
    let ret = {};
    dbmysql.batch(function(err, res) {
        if (err) {
            console.log('error in grabBatch: ', err);
        } else {
            
            console.log('length of few: ', res.length);
            // console.log('res in grabBatch: ', res);
            res.forEach(function(el){
                console.log('typeof :', typeof el.zone);
                if (ret[el.zone] === undefined) {
                    ret[el.zone] = 1;
                } else {
                    ret[el.zone] = ret[el.zone] + 1;
                } 
            })
            for (let key in ret) {
                let drivers = FakeCar.fakeCars(key, ret[key], 10);
                console.log('Drivers for zone: ', key, ' ', drivers);
            }
            callback(ret);
        }
    });
}

