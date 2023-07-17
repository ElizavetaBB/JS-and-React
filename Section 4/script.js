'use strict';

const box = document.querySelector(".box");
const button = document.querySelector("button");

const width = box.scrollWidth;
const height = box.scrollHeight;

button.addEventListener("click", () => {
    box.style.height = box.scrollHeight + "px";
    box.style.width = box.scrollWidth + "px";
});

const style = window.getComputedStyle(box);
console.log(style);