
function match(riders, drivers) {
    
    let prefDrivers = {};
    // prefDrivers contains a key of rider-id and a value of an array of tuples [driver object, dist2] sorted by proximity (nearest at index 0)
    for (var i = 0; i < riders.length; i++){
        let pickup = [riders[i]['pickup-x'], riders[i]['pickup-y']];
        prefDrivers[riders[i]['rider_id']] = orderByProx(pickup, drivers);
    }
    
    let choice = compChoice(prefDrivers);
    // compChoice takes the prefDrivers object and extracts each rider's first choice driver [rider, [driver obj, dist2]] and returns an array sorted by proximity.

    let marriedDrivers = {};
    let matches = 0;
    while (matches < riders.length){
        if (!marriedDrivers[choice[0][1][0]['driver_id']]) {
            marriedDrivers[choice[0][1][0].driver_id] = choice[0][0];
            delete prefDrivers[choice[0][0]];
            choice.shift();
            matches++;
        } else {
            prefDrivers[choice[0][0]].shift();
            choice = compChoice(prefDrivers);
        }
    }
    return marriedDrivers;
}

function compChoice(prefDrivers) {
    let rank = [];
    for (var key in prefDrivers) {
        rank.push([key, prefDrivers[key][0]]); //push in [rider, preferred car];
    }
    rank.sort(function(a,b){
        if (a[1][1] <= b[1][1]) {
            return -1;
        } else {
            return 1;
        }
    });
    return rank;
}

// structure of pickup = [pux, puy];

function orderByProx (pickup, drivers) {
    let mapDrivers = drivers.map((driver) => {
        let dist2 = Math.pow(Math.abs(driver.atx - pickup[0]), 2) + Math.pow(Math.abs(driver.aty - pickup[1]), 2);
        let result = [driver, dist2];
        return result;
    })
    mapDrivers.sort(function(a,b) {
        if (a[1] <= b[1]) {
            return -1;
        } else {
            return 1;
        }
    })
    return mapDrivers;
    // this is an array of tuples with driver objects and their distance2 from pickup;
}

module.exports.match = match;