'use strict';

const log = function(a, b, ...rest) {
    console.log(a, b, rest);
}

log('gggg', 'fa', 'rest', 'nextRest');

function calcOrDouble(number, basis = 2) {
    console.log(number * basis);
}

calcOrDouble(3);