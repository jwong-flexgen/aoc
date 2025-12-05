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
    // const maxX = arr[0].length - 1;
    // const maxY = arr.length - 1;
    // const paperNeighbors = (x, y) => {
    //     let p = 0;

    //     /**
    //      * a b c
    //      * d x e
    //      * f g h
    //      */
    //     const a = x > 0 && y > 0 ? arr[y-1][x-1] : '';
    //     const b = y > 0 ? arr[y-1][x] : '';
    //     const c = x < maxX && y > 0 ? arr[y-1][x+1] : '';
    //     const d = x > 0 ? arr[y][x-1] : '';
    //     const e = x < maxX ? arr[y][x+1] : '';
    //     const f = x > 0 && y < maxY ? arr[y+1][x-1] : '';
    //     const g = y < maxY ? arr[y+1][x] : '';
    //     const h = x < maxX && y < maxY ? arr[y+1][x+1] : '';

    //     p = [a, b, c, d, e, f, g, h].filter((val) => val === '@').length;
    //     return p;
    // }

    // for (let i = 0; i < arr.length; i++) {  // column
    //     for (let j = 0; j < arr[0].length; j++) {   // row
    //         if (arr[i][j] === '.') {
    //             // console.log('.');
    //             continue;
    //         }
    //         if (paperNeighbors(j, i) < 4) {
    //             // console.log('X');
    //             total++;
    //         // } else {
    //         //     console.log('@');
    //         }
    //     }
    // }

    // part 2
    const maxX = arr[0].length - 1;
    const maxY = arr.length - 1;
    const paperNeighbors = (x, y) => {
        let p = 0;

        /**
         * a b c
         * d x e
         * f g h
         */
        const a = x > 0 && y > 0 ? arr[y-1][x-1] : '';
        const b = y > 0 ? arr[y-1][x] : '';
        const c = x < maxX && y > 0 ? arr[y-1][x+1] : '';
        const d = x > 0 ? arr[y][x-1] : '';
        const e = x < maxX ? arr[y][x+1] : '';
        const f = x > 0 && y < maxY ? arr[y+1][x-1] : '';
        const g = y < maxY ? arr[y+1][x] : '';
        const h = x < maxX && y < maxY ? arr[y+1][x+1] : '';

        p = [a, b, c, d, e, f, g, h].filter((val) => val === '@').length;
        return p;
    }

    let removedSomething = true;
    while (removedSomething) {
        const initial = total;
        for (let i = 0; i < arr.length; i++) {  // column
            for (let j = 0; j < arr[0].length; j++) {   // row
                if (arr[i][j] === '.') {
                    // console.log('.');
                    continue;
                }
                if (paperNeighbors(j, i) < 4) {
                    // console.log('X');
                    arr[i][j] = '.';
                    total++;
                // } else {
                //     console.log('@');
                }
            }
        }
        if (total === initial) removedSomething = false;
    }


    console.log(total);
});
