const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);

// The below function is used for sample data generation
const addReq = function(userId, zone, atx, aty, tox, toy, callback) {
  connection.query(`insert into reqs (user_id, zone, atx, aty, tox, toy) values (${userId}, ${zone}, ${atx}, ${aty}, ${tox}, ${toy})`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const addBoReq = function(queryString, callback) {
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const batch = function(callback) {
  connection.query(`SELECT * FROM client WHERE tomatchat > NOW() - INTERVAL 10 SECOND`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

module.exports.addReq = addReq;
module.exports.addBoReq = addBoReq;
module.exports.batch = batch;
