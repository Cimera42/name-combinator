const fs = require('fs').promises;

function randomG(v) {
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return r / v;
}

function randomSkewed(pow, v) {
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.pow(Math.random(), pow);
    }
    return r / v;
}

const data = new Array(100000).fill().map(() => randomSkewed(2, 5));
const output = data.join('\n');
fs.writeFile('testRand.csv', output);
