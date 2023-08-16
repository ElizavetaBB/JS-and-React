'use strict';

const msg = 'My number +12345678, name: Oleg';
 
function transformMsg(str) {
 
    // Пропущенная часть

    let a = str.replace(/\+\d{8}/, "*****");
    let b = a.replace(/\w{4}:\s\w{1,}/, "hidden");
    return b;
}
 
let result = transformMsg(msg);
console.log(result);