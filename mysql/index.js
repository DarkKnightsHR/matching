const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);

const addReq = function(userId, zone, atx, aty, tox, toy, callback) {
  connection.query(`insert into reqs (user_id, zone, atx, aty, tox, toy) values (${userId}, ${zone}, ${atx}, ${aty}, ${tox}, ${toy})`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

module.exports.addReq = addReq;
