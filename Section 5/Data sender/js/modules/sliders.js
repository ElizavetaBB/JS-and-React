function sliders() {
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prevArrow = document.querySelector('.offer__slider-prev'),
          nextArrow = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let currentSlideIndex = 1;
    let offset = 0;

    function setCurrentSlideIndex(currentSlideIndex) {
        current.textContent = currentSlideIndex < 10? `0${currentSlideIndex}` : currentSlideIndex;
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${currentSlideIndex}`;
    } else {
        total.textContent = slides.length;
        setCurrentSlideIndex(currentSlideIndex);
    }

    slidesInner.style.width = slides.length * 100 + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          pageDots = [];
    dots.classList.add('carousel-dots');
    slider.append(dots);

    function setDotsOpacity(dots, slideIndex) {
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });

        dots[slideIndex - 1].style.opacity = '1';
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        dots.append(dot);
        pageDots.push(dot);
    }

    setDotsOpacity(pageDots, currentSlideIndex);

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

        setCurrentSlideIndex(currentSlideIndex);
        setDotsOpacity(pageDots, currentSlideIndex);
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

        setCurrentSlideIndex(currentSlideIndex);
        setDotsOpacity(pageDots, currentSlideIndex);
    });

    pageDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            currentSlideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesInner.style.transform = `translateX(-${offset}px)`;

            setCurrentSlideIndex(currentSlideIndex);
            setDotsOpacity(pageDots, currentSlideIndex);
        });
    });
}

export default sliders;