'use strict';

// function showThis(a, b) {
//     console.log(this);

//     function sum() {
//         console.log(this);
//         return a + b;
//     }

//     console.log(sum());
// }

// showThis(1, 7);

// const obg = {
//     a: 20,
//     b: 20,
//     sum: function() {
//         function shout() {
//             console.log(this);
//         }

//         shout();
//     }
// }

// obg.sum();

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
// }

// let pers = new User('pers', 3);

const btn = document.querySelector("button");

function changeColor() {
    this.style.backgroundColor = "red";
}

btn.addEventListener("click", changeColor);