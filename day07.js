const fs = require('fs');

function processInputFile(inputText) {
    const locations = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;

        locations.push(line.split(''));
    }

    return locations;
}

const filePath = './input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const locations = processInputFile(data);

    let total = 0;

    // part 1
    // const tachyons = new Set();
    // tachyons.add(locations[0].indexOf('S'));
    // for (let i = 1; i < locations.length; i++) {
    //     const indices = locations[i].map((val, idx) => val === '^' ? idx : -1).filter((val) => val !== -1);
    //     if (indices.length === 0) continue;
    //     // console.log(indices)
    //     for (const entry of tachyons.entries()) {
    //         const val = entry[0];
    //         if (indices.includes(val)) {
    //             total++;
    //             tachyons.delete(val);
    //             if (val >= 0) tachyons.add(val-1);
    //             if (val <= locations[0].length) tachyons.add(val+1);
    //         }
    //     }
    // }

    // part 2
    // columns track how many paths pass through the point
    // an intersection means that a path stops there but splits into the left and right
    const columns = new Array(locations[0].length).fill(0);
    columns[locations[0].indexOf('S')] = 1;
    for (let i = 1; i < locations.length; i++) {
        const indices = locations[i].map((val, idx) => val === '^' ? idx : -1).filter((val) => val !== -1);
        if (indices.length === 0) continue;

        for (const idx of indices) {
            const myVal = columns[idx];
            columns[idx] = 0;
            if (idx >= 0) {
                columns[idx-1] += myVal;
            }
            if (idx <= locations[0].length) {
                columns[idx+1] += myVal;
            }
        }
    }

    total = columns.reduce((acc, val) => acc + val, 0);

    console.log(total);
});
