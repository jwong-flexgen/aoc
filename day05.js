const fs = require('fs');

function processInputFile(inputText) {
    const ranges = [];
    const ingredients = [];
    const lines = inputText.split('\n');

    let isRanges = true;
    for (const line of lines) {
        if (line.trim() === '') isRanges = false;

        if (isRanges) {
            ranges.push(line.split('-').map((val) => Number(val)));
        } else {
            ingredients.push(Number(line));
        }
    }

    return {ranges, ingredients};
}

const filePath = './input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const {ranges, ingredients} = processInputFile(data);

    let total = 0;

    // part 1
    // ingredients.forEach((i) => {
    //     if (ranges.some((range) => i >= range[0] && i <= range[1])) total++;
    // });

    // part 2
    // https://old.reddit.com/r/adventofcode/comments/1pemdwd/2025_day_5_solutions/nsdo8ja/
    ranges.sort((a, b) => a[0] - b[0]);
    let current = 0;
    for (let i = 0; i < ranges.length; i++) {
        // skip jumps in ranges
        ranges[i][0] = Math.max(ranges[i][0], current+1);
        // total is generated from current range's end and pointer,
        // which skips over overlaps
        total += Math.max(0, ranges[i][1]-ranges[i][0]+1);
        // move  pointer to next range index
        current = Math.max(current, ranges[i][1]);
    }

    console.log(total);
});
