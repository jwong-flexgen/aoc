const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        line.split(',').forEach((range) => {
            const x = range.split('-');
            const start = x[0];
            const end = x[1];
            arr.push([start, end]);
        })
    }

    return arr;
}

const filePath = './input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const arr = processInputFile(data);

    let total = 0;

    // part 1
    // const isInvalid = (id) => {
    //     if (id.length % 2 !== 0) return false;
    //     const index = id.length / 2;
    //     const first = id.substring(0, index);
    //     const second = id.substring(index);
    //     if (first === second) return first;
    //     return false;
    // };

    // arr.forEach((range) => {
    //     for (let x = Number(range[0]); x <= Number(range[1]); x++) {
    //         const result = isInvalid(String(x));
    //         if (result !== false) {
    //             total += x;
    //         }
    //     }
    // })

    // part 2
    const invalids = (id) => {
        let invalid = false;
        const maxSize = Math.floor(id.length / 2);
        for (let size = 1; size <= maxSize; size++) {
            const re = new RegExp(String.raw`.{1,${size}}`, 'g');
            const combinations = id.match(re);
            if (combinations.every((val) => val === combinations[0])) {
                invalid = true;
            }
        }
    
        return invalid;
    };

    arr.forEach((range) => {
        for (let x = Number(range[0]); x <= Number(range[1]); x++) {
            if (invalids(String(x))) {
                total += x;
            }
        }
    })

    console.log(total);
});
