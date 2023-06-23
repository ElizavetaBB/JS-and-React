/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

// Код возьмите из предыдущего домашнего задания

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
}

let movies = [];
let ratings = [];

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        do {
            movies[i] = prompt('Один из последних просмотренных фильмов?', '');
            ratings[i] = prompt('На сколько оцените его?', '');
        } while (!movies[i] || !ratings[i]);
    
        if (movies[i].length > 50) i--;
    }

    personalMovieDB.movies[movies[0]] = ratings[0];
    personalMovieDB.movies[movies[1]] = ratings[1];
}

rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        alert("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        alert("Вы классический зритель");
    } else if (personalMovieDB.count >= 30) {
        alert("Вы киноман");
    } else {
        alert("Error");
    }
}

detectPersonalLevel();

/*
2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы */

function showMyDB(privat) {
    if (!privat) console.log(personalMovieDB);
}

showMyDB(personalMovieDB.privat);

/*
3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres */

function writeYourGenres() {
    for (let i = 0; i < 3; i++) {
        let genre = prompt(`Ваш любимый жанр под номером ${i + 1}`, "");

        while (genre == '' || genre == null || (typeof(genre) === "string" && genre.trim().length == 0)) {
            genre = prompt(`Ваш любимый жанр под номером ${i + 1}`, "");
        }
        personalMovieDB.genres[i] = genre;
    }
}

writeYourGenres();
console.log(personalMovieDB.genres);
