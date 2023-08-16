import tabs from './modules/tabs';
import modalWindows from './modules/modalWindows';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import calculator from './modules/calculator';
import { openModal } from './modules/modalWindows';

window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 1000 * 50);

    // Tabs
    tabs();
    // Timer
    timer();
    // Modal
    modalWindows('[data-modal]', '.modal');
    // Classes
    cards();
    // Forms
    forms('form', modalTimerId);
    // Slider
    sliders();
    // Calculator
    calculator();
});