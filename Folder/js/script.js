"use strict";

let number = 5; debugger

function logNumber() {
    let number = 4; debugger

    function logNewLevel() {
        console.log(number); debugger
    }

    logNewLevel();
    console.log(number);
}

number = 6;

logNumber(); debugger