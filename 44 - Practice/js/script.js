/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

// 1
const adv = document.querySelectorAll('.promo__adv img');
adv.forEach(el => el.remove());

// 2
const poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre');

genre.innerText = "ДРАМА";

// 3
poster.style.background = 'url("img/bg.jpg")';

// 4 и 5

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

const pageMovies = document.querySelector('.promo__interactive-list'),
      moviesList = document.querySelectorAll('.promo__interactive-item');

pageMovies.innerHTML = "";

movieDB.movies.forEach((el, index) => {
    pageMovies.innerHTML += `
        <li class="promo__interactive-item">${index + 1}. ${el}
            <div class="delete"></div>
        </li>
    `
});

