# JS-and-React
## Разделение кода на модули
Для экспорта функции используется синтаксис:
```
module.exports = myModule; // myModule - созданная функция
```
Для импорта:
```
const myModule = require('./main'); // путь до файла
```

Однако браузер не знает ничего про экспорты и импорты, поэтому необходимо собрать проект для браузера с помощью Webpack. Он не только собирает скрипты в один, но весь проект целиком.
### Webpack
Установка - https://webpack.js.org/guides/getting-started/

Далее разделяем код на файлы и используем синтаксис выше.
### ES6 Modules
Экспорт:
```
export let one = 1;

let two = 2;
export {two} - именованный экспорт

export function funcName() {...}
```
Импорт:
```
import {one, two} from './путь до файла' - для именованного синтаксиса обязательны фигурные скобки

import {one as first} from ... - переименовывание импортируемой сущности

import * as data from ... - импорт всего из файла
data.one - обращение к свойству
```

Экспорт по умолчанию:
```
export default function funcName() {...}

import funcName from ... - здесь фигурные скобки не нужны (укорочено от import {default as funcName} from ...)
```

Подключение таких модулей необходимо делать последовательно в зависимости от того, какой модуль в каком используется:
```
<script type='module' src='...></script>
<script type='module' src='...'></script>
```

## Ошибки
Отлавливание:
```
try {

} catch (e) {

} finally {

}
```
Собственные ошибки:
```
throw new Error('собственный текст');
let err = new Error('text');
err.name, err.message, err.stack - свойство ошибок
```
Классы ошибок:
```
class ValidatorError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidatorError";
    }
}
```
https://learn.javascript.ru/custom-errors

## Оптимизация кода под разные браузеры
`Babel` - инструмент преобразования кода ECMAScript 2015+ в обратно совместимую версию JavaScript в текущих и более старых браузерах или средах.

Установка - https://babeljs.io/docs/usage

`Полифиллы (polyfill)` - 

Проверить используемость бразуеров и их версий - https://browserslist.dev/?q=bGFzdCAyIHZlcnNpb25z

## Фреймворки на JS
### Angular
Что требуется для осваивания:
- node.js - хотя бы установка
- TypeScript
- Webpack
- MVC pattern
- Angular
### Vue.js
- Webpack
- Vue
### React
Библиотека - использует комбинацию JS с версткой - JSX.

Что нужно:
- Препроцессор JSX
- Babel
- React
## Библиотека Jquery
https://jquery-docs.ru/

Установка:
```
npm install jquery --save
```
Импорт:
```
import 'jquery';
```
### Функции
Получение элемента:
```
$('#btn') - получение элемента по id="btn"
```
Начало использования jQuery: 
1. Удостовериться, что структура страницы загружена
```
$(document).ready(function() {
    все действия страницы;
});
```
2. Выбрать первый элемент класса и т.п.
```
$('.list-item:first')
```

## Функции-генераторы
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/function*

Генераторы являются функциями с возможностью выхода и последующего входа. Их контекст исполнения (значения переменных) сохраняется при последующих входах.

Создание такой функции:
```
function* generator() { - ставим *
yield 'S';
yield 'c';
...
}
```

За выдачу нового результата отвечает `yield`.

Чтобы вызвать следующий шаг генератора:
```
const myFun = generator();
console.log(myFun.next()); // {value: 'S', done: false}
console.log(myFun.next()); // {value: 'c', done: false}
console.log(myFun.next()); // {value: undefined, done: true}
```
Получение значения:
```
console.log(myFun.next().value);
```

Для неручного запуска генератора несколько раз:
```
function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

for (let k of count(7)) {
    console.log(k);
}
```

## Создание нестандартных анимаций
В css все анимации плавные, поэтому, например, если хочется создать рваную анимацию, делается это в js.

`requestAnimationFrame(myAnimationFunction)` - это встроенный метод браузера, который вызывает переданную в него функцию в тот момент, когда браузер готовится совершить перерисовку (обычно это происходит быстро, но конкретные задержки зависят от браузера).

Когда вкладка скрыта, на ней совсем не происходит перерисовок, и функция не будет вызвана: анимация будет приостановлена и не потратит ресурсы.

Для остановки анимации:
```
let id = requestAnimationFram(myAnimationFunction);
cancelAnimationFrame(id);
```

### Web Animations API
https://developer.mozilla.org/ru/docs/Web/API/Animation

1. Первый вариант
```
new Animaton(effect: KeyframeEffect, timeline: DocumentTimeline);
```
2. Быстрый способ создания Animaton:
```
Element.animate(keyframes, options);
```
## Макро и микрозадачи
`Макрозадача` - каждая задача, которая попадает в Callback Queue. setTimeout попадает сюда.

`Микрозадача` - выполняются перед выполнением макрозадач - все сразу. До рендеринга страницы! Promise относится к ним.

Можно спланировать микрозадачу можно так:
```
queueMicrotask(
    () => console.log('wow') //
);
```