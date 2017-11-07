
function match(riders, drivers) {
    
    const isNuffCars = riders.length <= drivers.length;
    // if isNuffCars {match riders with their nearest cars
    // } else {match cars with their nearest riders} or rather, just match on timestamp for as many riders as there are cars?
    // assume isNuffCars to start...
    
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
    let iter = 0;
    while (matches < riders.length){
        if (!marriedDrivers[choice[iter][1][0]['driver_id']]) {
            marriedDrivers[choice[iter][1][0].driver_id] = choice[iter][0];
            delete prefDrivers[choice[iter][0]];
            choice.shift();
            matches++;
        } else {
            prefDrivers[choice[iter][0]].shift();
            choice = compChoice(prefDrivers);
        }
    }
    return marriedDrivers;
}

function compareDist(a,b) {
    if (a[1] <= b[1]) {
        return -1;
    } else {
        return 1;
    }
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

//Tests

// var riders = [{"pickup-x":5186,"pickup-y":4628,"dropoff-x":4496,"dropoff-y":385,"distance":6017,"base-price":13.24,"zone":46,"created_at":"2017-11-04T00:03:31.881Z","rider_id":"2c8fa85c-a380-4d1c-935b-1dcf3f849440","final-price":13.24,"surge-ratio":1,"status":"accepted"},{"pickup-x":9418,"pickup-y":4577,"dropoff-x":6595,"dropoff-y":4061,"distance":4017,"base-price":8.84,"zone":50,"created_at":"2017-11-03T04:07:06.102Z","rider_id":"649cade2-64ec-4e1e-908c-b024a118ec1d","final-price":35.36,"surge-ratio":4,"status":"accepted"},{"pickup-x":9007,"pickup-y":6975,"dropoff-x":2256,"dropoff-y":2112,"distance":11648,"base-price":25.63,"zone":70,"created_at":"2017-11-03T04:07:04.596Z","rider_id":"8a60e4ff-ec0e-4ffe-ad93-a24b606ceb99","final-price":25.63,"surge-ratio":1,"status":"accepted"}];
// var drivers = [{"driver_id":"123xyz","atx":5489,"aty":6743},{"driver_id":"123tyr","atx":3468,"aty":4598},{"driver_id":"123zkh","atx":7865,"aty":2487}];

// console.log('orderByProx: 0, 0 : ', orderByProx([0, 0], drivers));
// console.log('These are the matches: ', match(riders,drivers));

// var riders = [{"pickup-x":5000,"pickup-y":5000,"dropoff-x":4496,"dropoff-y":385,"distance":6017,"base-price":13.24,"zone":46,"created_at":"2017-11-04T00:03:31.881Z","rider_id":"2c8fa85c-a380-4d1c-935b-1dcf3f849440","final-price":13.24,"surge-ratio":1,"status":"accepted"},{"pickup-x":9999,"pickup-y":9999,"dropoff-x":6595,"dropoff-y":4061,"distance":4017,"base-price":8.84,"zone":50,"created_at":"2017-11-03T04:07:06.102Z","rider_id":"649cade2-64ec-4e1e-908c-b024a118ec1d","final-price":35.36,"surge-ratio":4,"status":"accepted"},{"pickup-x":0001,"pickup-y":0001,"dropoff-x":2256,"dropoff-y":2112,"distance":11648,"base-price":25.63,"zone":70,"created_at":"2017-11-03T04:07:04.596Z","rider_id":"8a60e4ff-ec0e-4ffe-ad93-a24b606ceb99","final-price":25.63,"surge-ratio":1,"status":"accepted"}];
// var drivers = [{"driver_id":"123xyz","atx":9000,"aty":9000},{"driver_id":"123tyr","atx":5000,"aty":5000},{"driver_id":"123zkh","atx":0001,"aty":0001}];

// // console.log('orderByProx: 5000, 5000 : ', orderByProx([5000, 5000], drivers));
// console.log('These are the matches: ', match(riders,drivers));

