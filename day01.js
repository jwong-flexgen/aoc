const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        arr.push([line[0], line.substring(1)]);
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

    let position = 50;
    let total = 0;

    // part 1
    // for (const [dir, step] of arr) {
    //     if (dir === 'L') {
    //         position -= Number(step);
    //         while (position < 0) {
    //             position += 100;
    //         }
    //     }
    //     if (dir === 'R') {
    //         position += Number(step);
    //         while (position > 99) {
    //             position -= 100;
    //         }
    //     }
    //     if (position === 0) {
    //         total++;
    //     }
    // }

    // part 2
    for (const [dir, step] of arr) {
        if (dir === 'L') {
            for (let x = Number(step); x > 0; x--) {
                position--;
                if (position === 0) total++;
                if (position < 0) position = 99;
            }
        }
        if (dir === 'R') {
            for (let x = Number(step); x > 0; x--) {
                position++;
                if (position > 99) position = 0;
                if (position === 0) total++;
            }
        }
    }

    console.log(total);
});
