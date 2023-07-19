window.addEventListener('DOMContentLoaded', function() {
	// Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2023-08-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalWindow = document.querySelector(".modal"),
          modalButtons = document.querySelectorAll("[data-modal]");


    function closeModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = "visible";
    }

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    modalButtons.forEach(el => el.addEventListener("click", openModal));

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 1000 * 50);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Classes

    class MenuItem {
        constructor(pictureUrl, alt, title, description, price, parentSelector, ...classes) {
            this.pictureUrl = pictureUrl;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 90;
            this.parentElement = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changePriceToRUB() {
            this.price = this.price * this.transfer;
        }

        renderer() {
            this.changePriceToRUB();

            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = ['menu__item'];
            }

            this.classes.forEach(className => element.classList.add(className));

            element.innerHTML = `
                <img src=${this.pictureUrl} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`

            this.parentElement.append(element);
        }
    }

    // const getResources = async (url) => {
    //     const result = await fetch(url);

    //     if (!result.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    //     }

    //     return await result.json();
    // }

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuItem(
    //                 img, 
    //                 altimg, 
    //                 title,
    //                 descr,
    //                 price,
    //                 '.menu .container',
    //                 'menu__item'
    //             ).renderer();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
         .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(
                    img, 
                    altimg, 
                    title,
                    descr,
                    price,
                    '.menu .container',
                    'menu__item'
                ).renderer();
                });
         });

    // Forms

    const forms = document.querySelectorAll("form");

    forms.forEach(form => bindPostData(form));

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 4000);
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          prevArrow = document.querySelector('.offer__slider-prev'),
          nextArrow = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current')
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let currentSlideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${currentSlideIndex}`;
    } else {
        total.textContent = slides.length;
        if (currentSlideIndex < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }
    }

    slidesInner.style.width = slides.length * 100 + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    nextArrow.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == slides.length) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
        }

        if (currentSlideIndex < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }
    });

    prevArrow.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (currentSlideIndex == 1) {
            currentSlideIndex = slides.length;
        } else {
            currentSlideIndex--;
        }

        if (currentSlideIndex < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }
    });

    // showSlides(currentSlideIndex);
    
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(nSlide) {
    //     if (nSlide > slides.length) {
    //         currentSlideIndex = 1;
    //     } else if (nSlide < 1) {
    //         currentSlideIndex = slides.length;
    //     }

    //     slides.forEach(elem => {
    //         elem.classList.remove('show');
    //         elem.classList.add('hide');
    //     });
    //     slides[currentSlideIndex - 1].classList.add('show');
    //     slides[currentSlideIndex - 1].classList.remove('hide');

    //     if (slides.length < 10) {
    //         current.textContent = `0${currentSlideIndex}`;
    //     } else {
    //         current.textContent = currentSlideIndex;
    //     }
    // }

    // function plusSlides(nSlide) {
    //     showSlides(currentSlideIndex += nSlide);
    // }

    // prevArrow.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // nextArrow.addEventListener('click', () => {
    //     plusSlides(1);
    // });
});