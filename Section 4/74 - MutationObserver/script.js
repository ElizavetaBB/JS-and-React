'use strict';

const box = document.querySelector('.box');

let boxObserver = new MutationObserver(mutationRecords => {
    console.log(mutationRecords);
});

boxObserver.observe(box, {
    childList: true
});