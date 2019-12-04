/*
  Algorien v0.0.1
  Project: https://github.com/ilies-t/algorien
  Author: ilies t <https://github.com/ilies-t>
  License: Apache License 2.0
*/

// return pct% similarity
var algorien = {
  splitIncr: splitIncr = (a) => {
    // split with each caracters
    const arr = a.split(''), testArr = [];
    let item = '', itemReversed = '';

    // create array with spliten caracters and incrementate
    /*
    * example with 'beach'
    * will be ['b', 'be', 'bea', 'beac', 'beach']
    * also, to avoid space problem, add a condition with undefined
    * @param {string} m - value to push into i array
    * @param {Number} i - array value
    */
    const _verifyArray = (m, i) => {
        if(arr[i] !== undefined) {
            m += arr[i];
            testArr.push(m);
        }
    };

    // for each item in i, increments with previous value
    for(let i = 0; i < arr.length; i++) {
        _verifyArray(item, i);
    };
    // same but inverted
    for(let i = arr.length; i > 0; i--) {
        _verifyArray(itemReversed, i);
    };

    return testArr;
  },
  // split x and y into array
  search: search = (x, y) => {
    const arrX = splitIncr(x),
          arrY = splitIncr(y);
    let pctY = 0;

    // compare and add 1 into pctY each same items
    arrX.forEach(item => {
        (arrY.includes(item)) ? pctY++ : false;
    });
    // calculate the percentage
    pctY = pctY / arrY.length;

    // round and return a real percentage
    return (Math.round(pctY * 100) / 100) * 100;
  }
}
