# JS-and-React
## Типы данных
### Null и undefined
null - определенное значение - т.е. объект был инициализирован тем, что его нет;

undefined - переменная так и не была инициализирована.
```
var element;
// значение переменной element до её инициализации не определённо: undefined

element = document.getElementById('not-exists');
// здесь при попытке получения несуществующего элемента, метод getElementById возвращает null
// переменная element теперь инициализирована значением null, её значение определено
```

https://flexiple.com/javascript/undefined-vs-null-javascript/
### Массивы
Массив - частный случай объекта (ключ - индекс), не отдельный тип данных. Могут содержать любые типы данных.
## Интерполяция
\`https://www.kaspersky.com/${path}\` - подстановка переменных в строку
## Операторы
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table

https://learn.javascript.ru/bitwise-operators
## Git
Документация - https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9E-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B5-%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9

Обучение - https://githowto.com/ru; https://learngitbranching.js.org/?locale=ru_RU

Список команд - https://www.codecademy.com/article/command-line-commands
## Функции
### Замыкание функций
https://webdevblog.ru/ya-ranshe-nikogda-ne-ponimal-zamykaniya-v-javascript/

Замыкание – это коллекция всех переменных в области видимости во время создания функции.

https://learn.javascript.ru/closure
### Виды
Function declaration - создается до начала выполнения скрипта, можно вызвать перед объявлением.
```
function foo() {}
```
Function expression - создается только тогда, когда доходит поток кода, можно вызвать только после объявления.
```
let foo = function() {}
```
Стрелочные функции - не имеют своего контекста this
```
() =>
```
## Строки и числа: методы и свойства
Строки:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String

Числа:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number
## Callback-функции
https://learn.javascript.ru/callbacks

Хорошо использовать, если вложенность колбеков - 1 или 2. Дальше код может стать нечитаемым. Лучшим решением в таком случае становятс промисы (https://learn.javascript.ru/promise-basics).
## Объекты
Перебор ключей объекта:
```
for (let key in options) {}
```
### Методы объекта
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
### Деструктуризация объектов
https://learn.javascript.ru/destructuring#destrukturizatsiya-obekta

Деструктуризация (destructuring assignment) – это особый синтаксис присваивания, при котором можно присвоить массив или объект сразу нескольким переменным, разбив его на части.
```
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

let {width: w, height: h, title} = options;
```
### Сортировка
Метод sort() использует метод быстрой сортировки и стандартно работает со строками - http://algolist.ru/sort/quick_sort.php
### Алгоритмы
https://web.archive.org/web/20221025084508/http://mathhelpplanet.com/static.php?p=javascript-algoritmy-poiska
## Копирование
1. Объекты можно скопировать через `Object.assign(target, ...sources)` - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign. 
Статья по копированию объектов - https://learn.javascript.ru/object-copy

2. Массивы копируются через метод `arr.slice()`.
3. Новый способ - оператор разворота данных (spread оператор). https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
```
const array = ['a','b'];
const newArray = [...array];
```
```
const one = {
    first: 1,
    second: 2
}
const newObj = {...one};
```
## ООП - JS - это прототипно-ориентированный язык
1. Наследование объектов через `__proto__` - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/proto. Устаревший способ!
2. Наследование не через `__proto__`: (https://javascript.info/prototype-methods)
- `Object.setPrototypeOf(dest, proto)` - если объект уже существует
- `Object.create(proto)` - создание нового объекта
## Динамическая типизация
Динамическая типизация - возможность одного типа данных превращаться в другой.

![Classification](images/classification.jpg)
## Замыкание функций и лексическое окружение
У каждой выполняемой функции, блока кода и скрипта есть связанный с ними внутренний (скрытый) объект, называемый лексическим окружением LexicalEnvironment.

Объект лексического окружения состоит из двух частей:
1. Environment Record – объект, в котором как свойства хранятся все локальные переменные, именуемые свойствами объекта (а также некоторая другая информация, такая как значение this).
2. Ссылка на внешнее лексическое окружение – то есть то, которое соответствует коду снаружи (снаружи от текущих фигурных скобок).