const fs = require('fs');

function processInputFile(inputText) {
    const nums = [];
    const lines = inputText.split('\n');

    // part 1 
    // for (const line of lines) {
    //     if (line.trim() === '') continue;

    //     nums.push(line.split(' ').map((val) => val.trim()).filter((val) => val !== ''));
    // }

    // let ops = nums.pop();
    // return {nums: nums.map((arr) => arr.map((val) => Number(val))), ops};

    // part 2
    for (const line of lines) {
        if (line.trim() === '') continue;

        nums.push(line);
    }

    const ops = nums.pop().split('').filter((val) => val !== ' ');
    return {nums, ops};
}

const filePath = './input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const {nums, ops} = processInputFile(data);

    let total = 0;

    // part 1
    // const numProblems = ops.length;
    // for (let i = 0; i < numProblems; i++) {
    //     if (ops[i] === '*') {
    //         let localTotal = 1;
    //         for (let j = 0; j < nums.length; j++) {
    //             localTotal = localTotal * nums[j][i];
    //         }
    //         total += localTotal;
    //     } else {
    //         let localTotal = 0;
    //         for (let j = 0; j < nums.length; j++) {
    //             localTotal = localTotal + nums[j][i];
    //         }
    //         total += localTotal;
    //     }
    // }

    // part 2
    const numProblems = ops.length;
    // not reversed anymore lol
    const reversed = nums.map((row) => row.split(''));
    let column = 0;
    for (let i = 0; i < numProblems; i++) {
        if (ops[i] === '*') {
            let localTotal = 1;

            let current = true;
            while (current) {
                let numStr = '';
                for (let j = 0; j < nums.length; j++) {
                    numStr += reversed[j][column];
                }
                column++;
                if (numStr.trim() === '' || column > reversed[0].length) {
                    current = false;
                } else {
                    localTotal = localTotal * Number(numStr.trim());
                }
            }

            total += localTotal;
        } else {
            let localTotal = 0;

            let current = true;
            while (current) {
                let numStr = '';
                for (let j = 0; j < nums.length; j++) {
                    numStr += reversed[j][column];
                }
                column++;
                if (numStr.trim() === '' || column > reversed[0].length) {
                    current = false;
                } else {
                    localTotal = localTotal + Number(numStr.trim());
                }
            }

            total += localTotal;
        }
    }

    console.log(total);
});
