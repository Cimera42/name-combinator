const fs = require('fs').promises;

const random = (filename) => {
    return fs.readFile(filename)
        .then(data => {
            const nameList = JSON.parse(data);
            const randomIndex = Math.floor(Math.random() * nameList.length);
            return nameList[randomIndex];
        });
}

// const flora = random('flora.json');
// const fauna = random('fauna.json');

// Promise.all([flora, fauna])
//     .then(([floraName, faunaName]) => {
//         console.log(`Flora: ${floraName}`);
//         console.log(`Fauna: ${faunaName}`);
//     });

function randomSkewed(pow, v) {
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.pow(Math.random(), pow);
    }
    return r / v;
}

const firstWord = name => name.split(" ")[0];
const normalisedRandIndex = (list, rev) => {
    let rand = randomSkewed(2, 5);
    if(rev) {
        rand = 1 - rand;
    }
    return Math.floor(rand * (list.length - 1)) + 1;
}

const generate = () => {
    Promise.all([
        random('flora.json').then(firstWord),
        random('flora.json').then(firstWord),
    ]).then(([a, b]) => {
        const newName = (
            a.slice(0, Math.floor(normalisedRandIndex(a))) +
            b.slice(Math.floor(normalisedRandIndex(b, true)))
        );
        console.log(`${newName.padEnd(30)}${a} / ${b}`);
    });
};

console.log("Press space to generate names, anything else to quit:")

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (str) => {
    if(str.toString() === ' ') {
        generate();
    } else {
        process.exit();
    }
});
