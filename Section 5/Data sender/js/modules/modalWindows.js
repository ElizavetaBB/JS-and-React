function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = "visible";
}

function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = "hidden";
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modalWindows(triggerSelector, modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector),
          modalButtons = document.querySelectorAll(triggerSelector);

    modalButtons.forEach(el => el.addEventListener("click", () => openModal(modalSelector, modalTimerId)));

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modalWindows;
export {closeModal, openModal};