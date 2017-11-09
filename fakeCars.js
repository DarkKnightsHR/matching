const uuid = require('uuid');

function fakeCars(zone, rides, factor) {
    let drivers = [];
    zone = Number.parseInt(zone, 10);
    let xMin = 1000 * (zone - 1) %10;
    let yMin = 1000 * Math.floor((zone - 1) / 10);
    let target = rides*factor;
    for (let i = 0; i < target; i++) {
        drivers.push(genCar(xMin, yMin));
    }
    return drivers;
}

function genCar(xm, ym) {
    let driver_id = uuid.v4();
    let atx = Math.floor(Math.random()*1000) + xm;
    let aty = Math.floor(Math.random()*1000) + ym;
    return { driver_id, atx, aty };
}

module.exports.fakeCars = fakeCars;

