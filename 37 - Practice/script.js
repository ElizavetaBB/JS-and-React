/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

// Код возьмите из предыдущего домашнего задания

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function() {
        let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
        while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
            numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
        personalMovieDB.count = numberOfFilms;
    },

    rememberMyFilms: function() {
        let movies = [],
            ratings = [];
        for (let i = 0; i < 2; i++) {
            do {
                movies[i] = prompt('Один из последних просмотренных фильмов?', '');
                ratings[i] = prompt('На сколько оцените его?', '');
            } while (!movies[i] || !ratings[i]);
        
            if (movies[i].length > 50) i--;
        }
    
        personalMovieDB.movies[movies[0]] = ratings[0];
        personalMovieDB.movies[movies[1]] = ratings[1];
    },

    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            alert("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            alert("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            alert("Вы киноман");
        } else {
            alert("Error");
        }
    },

    showMyDB: function() {
        if (!personalMovieDB.privat) console.log(personalMovieDB);
    },

    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            let genre = prompt(`Ваш любимый жанр под номером ${i + 1}`, "");
    
            while (genre == '' || genre == null || (typeof(genre) === "string" && genre.trim().length == 0)) {
                genre = prompt(`Ваш любимый жанр под номером ${i + 1}`, "");
            }
            
            personalMovieDB.genres[i] = genre;
        }

        personalMovieDB.genres.forEach((el, i) => console.log(`Любимый жанр #${i + 1} - это ${el}`));
    },

    toggleVisibleMyDB: function() {
        personalMovieDB.privat = !personalMovieDB.privat;
    }
}

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();
personalMovieDB.toggleVisibleMyDB();
personalMovieDB.showMyDB();
