const dbmysql = require('./mysql');


const zones = [
  [91,92,93,94,95,96,97,98,99,100],
  [81,82,83,84,85,86,87,88,89,90],
  [71,72,73,74,75,76,77,78,79,80],
  [61,62,63,64,65,66,67,68,69,70],
  [51,52,53,54,55,56,57,58,59,60],
  [41,42,43,44,45,46,47,48,49,50],
  [31,32,33,34,35,36,37,38,39,40],
  [21,22,23,24,25,26,27,28,29,30],
  [11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10]
];

function genGeo() {
	let x = Math.floor(Math.random() * 10000);
	let y = Math.floor(Math.random() * 10000);
	return {x, y};
}

function zoneNo(geo) {
	let ones = Math.round(geo.x/1000) +1;
	let tens = Math.round(geo.y/1000);
	return (tens * 10 + ones);
}

function genUid() {
	return Math.round(Math.random() * 1000000);
}

let newEntries = 0;
for(let i = 0; i < 100000; i++) {
	let user = genUid();
	let geo = genGeo();
	let zone = zoneNo(geo);
	let geo2 = genGeo();
	dbmysql.addReq(user, zone, geo.x, geo.y, geo2.x, geo2.y, function(err, res){
		if (err) {
			console.log('error saving entry', err);
		} else {
			newEntries++;
			console.log('success adding entry no: ', newEntries);
		}
	})
}








