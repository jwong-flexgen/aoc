const fs = require('fs');

function processInputFile(inputText) {
    const arr = [];
    const lines = inputText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') continue;
        arr.push(line.split(''));
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
    // for (let i = 0; i < arr.length; i++) {
    //     let localMax = 0;
    //     for (let j = 0; j < arr[i].length; j++) {
    //         for (let k = j + 1; k < arr[i].length; k++) {
    //             const localNum = Number(`${arr[i][j]}${arr[i][k]}`);
    //             if (localMax < localNum) {
    //                 localMax = localNum;
    //             }
    //         }
    //     }
    //     total += localMax;
    // }

    // part 2
    for (let i = 0; i < arr.length; i++) {
        const combine = (myArr) => {
            return Number(myArr.map((x) => arr[i][x]).join(''));
        }

        const row = arr[i];
        let localArr = [];
        for (let x = 0; x < 12; x++) {
            localArr.unshift(row.length - 1 - x);
        }
        let localNum = combine(localArr);

        for (let a = 0; a < 12; a++) {
            for (let b = localArr[a]; b >= 0; b--) {
                let testArr = [...localArr];
                if (a > 0 && b === localArr[a - 1]) break;

                testArr.splice(a, 1, b);
                let testNum = combine(testArr);

                if (testNum >= localNum) {
                    localArr = [...testArr];
                    localNum = testNum;
                }
            }
        }

        total += localNum;
    }

    console.log(total);
});
