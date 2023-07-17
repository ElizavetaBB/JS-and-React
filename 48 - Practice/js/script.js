/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', () => {
    const adv = document.querySelectorAll('.promo__adv img');
    adv.forEach(el => el.remove());

    const poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre');

    genre.innerText = "ДРАМА";

    poster.style.background = 'url("img/bg.jpg")';

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    movieDB.movies.sort();

    const pageMovies = document.querySelector('.promo__interactive-list');

    pageMovies.innerHTML = "";

    movieDB.movies.forEach((el, index) => {
        pageMovies.innerHTML += `
            <li class="promo__interactive-item">${index + 1}. ${el}
                <div class="delete"></div>
            </li>
        `
    });

    const deleteMovie = (event) => {
        const lielement = event.target.parentElement;
        let i = 0;

        while (lielement.parentElement.children[i] !== lielement) i++;

        movieDB.movies.splice(i, 1);

        pageMovies.innerHTML = "";

        movieDB.movies.forEach((el, index) => {
            pageMovies.innerHTML += `
                <li class="promo__interactive-item">${index + 1}. ${el}
                    <div class="delete"></div>
                </li>
            `
        });
        
        const deleteElements = document.querySelectorAll('.promo__interactive-item .delete');
        deleteElements.forEach(el => el.addEventListener('click', deleteMovie));
    }

    /*
    1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    новый фильм добавляется в список. Страница не должна перезагружаться.
    Новый фильм должен добавляться в movieDB.movies.
    Для получения доступа к значению input - обращаемся к нему как input.value;
    P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
    5) Фильмы должны быть отсортированы по алфавиту 
    */

    const formElement = document.querySelector('form.add'),
          inputElement = formElement.querySelector('.adding__input'),
          checkboxElement = formElement.querySelector('[type="checkbox"]');

    const addNewMovie = (event) => {
        event.preventDefault();

        const newMovie = inputElement.value.length > 21? `${inputElement.value.slice(0, 22)}...` : inputElement.value;

        movieDB.movies.push(newMovie);
        movieDB.movies.sort();

        pageMovies.innerHTML = "";

        movieDB.movies.forEach((el, index) => {
            pageMovies.innerHTML += `
                <li class="promo__interactive-item">${index + 1}. ${el}
                    <div class="delete"></div>
                </li>
            `
        });

        const deleteElements = document.querySelectorAll('.promo__interactive-item .delete');
        deleteElements.forEach(el => el.addEventListener('click', deleteMovie));

        if (checkboxElement.checked) {
            console.log("Добавляем любимый фильм");
        }
    };

    formElement.addEventListener('submit', addNewMovie);

    /*
    3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
    */

    const deleteElements = document.querySelectorAll('.promo__interactive-item .delete');
    deleteElements.forEach(el => el.addEventListener('click', deleteMovie));
});

