/*
  Algorien v0.0.1
  Project: https://github.com/ilies-t/algorien
  Author: ilies t <https://github.com/ilies-t>
  License: Apache License 2.0
  Based on Levenshtein's works
  https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm
*/

// return pct% similarity between two arrays
var algorien = {
  splitIncr: splitIncr = (a) => {
    // split with each caracters
    const arr = a.toLowerCase().split(''), finalArray = [];
    let item = '', itemReversed = '';

    // create array with spliten caracters and add previous caracters each loop
    /*
    * example with 'beach'
    * will be ['b', 'be', 'bea', 'beac', 'beach',
    *          'h', 'hc', 'hca', 'hcae', 'hcaeb']
    * also, to avoid space problem, add a condition with undefined
    */
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== undefined) {
            item += arr[i];
            finalArray.push(item);
        }
    };
    // same but inverted
    for(let i = arr.length; i > 0; i--) {
        if(arr[i] !== undefined) {
            itemReversed += arr[i];
            finalArray.push(itemReversed);
        }
    };
    return finalArray;
  },
  // split x and y into array
  search: search = (x, y) => {
    const arrX = splitIncr(x),
          arrY = splitIncr(y);
    let pctY = 0;

    // compare and add 1 into pctY if items are similars
    arrX.forEach(item => {
        (arrY.includes(item)) ? pctY++ : false;
    });
    // calculate the percentage
    pctY = pctY / arrY.length;

    // round and return a real percentage
    return (Math.round(pctY * 100) / 100) * 100;
  }
}
