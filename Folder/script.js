'use strict';

function deepCount(a){
    let count = a;

    for (let i = 0; i < a.length; i++) {
        if (Array.isArray(a[i])) {
            count += deepCount(a[i]);
        }
    }
}

console.log(isPangram("Hello world"));