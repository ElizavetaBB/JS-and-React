# JS-and-React
## JS в работе
### Параметры окна и документа
![alt texr](images/doc_properties.PNG)
Благодаря свойству `scrollTop`, например, можно создать полосу прогресса - сколько контента пользователь уже пролистал/прочитал.

Определение координат элемента по отношению к левому верхнему углу:
`getBoundingClientRect()`

Предыдущие способы забирают реальные свойства элементов со страницы, не из CSS стилей. Можно получить `computed` стили со страницы, которые нельзя менять, только прочитать:
```
const style = window.getComputedStyle(elem); // получаем элемент типа CSSStyleDeclaration
```

Добавить блокировку внешнего контента при открытом модальном окне можно следующим образом:
```
document.body.style.overflow = "hidden";
```

Закрытие модального окна по нажатию на внешнюю область можно сделать так:
```
modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow) {
            modalWindow.classList.remove('show');
            modalWindow.classList.add('hide');
            document.body.style.overflow = "visible";
        }
    });
```

Отлавливать события нажатия кнопок:
```
this.document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });
```

Узнать event код - https://www.toptal.com/developers/keycode.

Вызов модалки через некоторое время:
```
const modalTimerId = setTimeout(openModal, 1000 * 10); // 10 секунд
```

Вызов модалки (и выполнения любого слушателя) только один раз:
```
function showModalByScroll() {
        // выполнение едйствия
        window.removeEventListener('scroll', showModalByScroll); // удаление слушателя
    }
```

### MutationObserver, ResizeObserver и contenteditable

Слушатели изменений внутри элемента. `MutationObserver` предоставляет возможность получать уведомления об изменении определённых DOM-элементов.

`contenteditable` - универсальный атрибут разрешает редактирование содержимого элемента прямо в браузере.

Все свойства в MutationObserver, за которыми можно следить: https://developer.mozilla.org/ru/docs/Web/API/MutationObserver#mutationobserverinit

Добавление обзервера, например, на box:
```
let boxObserver = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); 
});

boxObserver.observe(box, {
    childList: true // выбираем, за какими конкретно изменениями хотим следить
});

observer.disconnect(); // когда обзервер больше не нужен
```

Изменения записываются в объект типа MutationRecord - https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord

> Отслеживания является **асинхронной** операцией, которая может выполниться чуть позже или раньше, в зависимости от условий. Поэтому и получаем массив изменений.

Примеры обзерверов:
1. PerformanceObserver
2. ResizeObserver - второй по полезности. Отслеживает изменение размеров элементов. Примеры использования - https://www.youtube.com/watch?v=M2c37drnnOA
3. IntersectionObserver

### Функции-конструкторы
Создание множества похожих, однотипных объектов, таких как пользователи, элементы меню и так далее, можно сделать при помощи функции-конструктора и оператора "new".

Функции-конструкторы технически являются обычными функциями. Но есть два соглашения:
1. Имя функции-конструктора должно начинаться с большой буквы.
2. Функция-конструктор должна выполняться только с помощью оператора "new".
```
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
```

Когда функция вызывается как new User(...), происходит следующее:
1. Создаётся новый пустой объект, и он присваивается this.
2. Выполняется тело функции. Обычно оно модифицирует this, добавляя туда новые свойства.
3. Возвращается значение this.

Добавить к закрытым классам новые свойства и функции можно так:
```
<Class>.prototype.<function name> = function(name) {
    console.log(`Hello ${name}`)
}
```

### Контекст вызова функции (this)
То, что окружает функцию, и в каких условиях она вызывается.

1. Если вызывать функцию не в strict-режиме ('use strict'), то `this = window`. При strict-режиме = `undefined`.
2. Контекст у методов объекта - сам объект, т.е. `this = object`
3. Контекстом у функции-конструктра и класса является новый экземпляр объекта.
4. **У стрелочной функции нет своего контекста вызова**. Она берет контекст у своего родителя. В обработчике событий при наличии стрелочных функций можно вместо `this` использовать `event.target.<любое изменение>`

Для передача контекста объекта в другую функцию, есть 3 метода:
1. `<function>.call(object, ...arguments в виде строк)` - только устанавливает контекст
2. `<function>.apply(object, ...arguments в виде одного массива)` - аналогично call.
3. `const newFunction = <function>.bind(object); newFunction(...arguments);` - создает новую функцию, связанную с определенным контекстом.

В функции уже можем обращаться к `this`, и оно будет равен `object`, а не window или undefined.

https://tproger.ru/translations/javascript-this-keyword/

### Классы в ES6
"Обертка" функций-конструкторов. 
```
class <Classname> {
    constructor(arguments) { // создание экземпляра класса
        this.arg1 = arg1; // обращаемся к экземпляру нового созданного объекта
    }

    firstMethod() { // не пишем function
        действия метода;
    }
}
```
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes

#### ООП в JS
1. Абстракция
> Абстракция - отделение концепции от ее экземпляра. В данном случае концепция - это класс, а экземпляр концепции - экземпляры класса.
2. Наследование
> Наследование - способность объекта/класса базироваться на другом объекте/классе. В JS для этого есть ключевые слова `extends` и `super`.

Чаще всего наследование в JavaScript реализуется с помощью функции `Object.create()`, позволяющий создать новый объект с заданным прототипом. Однако это прототипное наследование - если у объекта-родителя добавится новое свойство, оно появится и у наследника.
3. Полиморфизм
4. Наследование

http://jsraccoon.ru/es6-classes

### Rest-оператор и параметры по умолчанию
Rest-оператор выполняет операции обработно spread-оператору: отдельные элементы объяединяет в один массив. Записывается всегда последним.

Параметры по умолчанию - чтобы параметр имел базовое значение, даже если не будет передан, необходимо значение прописать через равно:
```
function calcOrDouble(number, basis = 2) {
    console.log(number * basis);
}
calcOrDouble(3); // 6
```

## Продвинутый JS
### Передача объектов по сети
Передавать объекты в чистом виде нельзя. Можно перевести их в JSON строку:
```
JSON.stringify(object);
```

Перевод из JSON-а в обычный объект:
```
JSON.parse(object)
```
> Таким способом можно создавать глубокие копии объектов.
### AJAX и общение с сервером
Способы формирования HTTP запроса:
1. XMLHttpRequest - https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest. Методы и свойства:
    - request.open(method, url, async, login, pass) - url сервера, async - асинхронность. Синхронный код идет по порядку и все операции ниже ждут операции выше. Асинхронный код - никого не ждут.
    - request.setRequestHeader('Content-type', 'application/json: charset=utf-8');
    - request.send();
    - status - показывает статус запроса
    - statusText - текстовое описание статуса ответа
    - response/responseText
    - readyState - цифра или слова: UNSENT/OPENED/HEADERS_RECEIVED/LOADING/DONE.
2. FetchAPI - ниже.

### Отправка данных на сервер
```
const request = new XMLHttpRequest();
request.open('POST', 'js/server.php');
request.setRequestHeader('Content-type', 'application/json');

const formData = new FormData(form);
const object = {};

formData.forEach((value, key) => {
    object[key] = value;
});

request.send(JSON.stringify(object));
```
### Промисы (Promise)
Используется в асинхронных операциях - другим примером являются таймауты и запросы на сервер.

Promise - обещание, что после выполнения одного, будет выполнено второе, третье и т.п. цепочка.

Обычно в Promise коллбэк-функции принимают в себя 2 параметра: resolve и reject:
```
const req = new Promise(function(resolve, reject) {
    setTimeout(() => {
        ....
        resolve(product);
        ....
        reject(product);
    }, 2000);
});

req.then(....) // обрабатывает resolve функцию
   .catch(...) // обрабатывает reject
```
Операции `then` могут идти цепочкой в случае, если внутри возвращать новый промис:
```
req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });
}).then(data => {
        console.log(data);
})
```

Для закрытия промис функции используется блок `finally`: 
```
req.then(...)
   .then(...)
   .catch(...)
   .finally(() => {
        console.log("End time");
    })
```

Еще методы промисов:
1. Promise.all(promises[]) - внутрь себя принимает массив с промисами. Потом их можно обработать `then()`. Позволяет убедиться, что все промисы выполнились.
2. Promise.race(promises[]) - выполняется определенная операция из `then()`, когда один из промисов правильно отработал.

### Fetch API
https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch

Fetch API предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP. Он также предоставляет глобальный метод fetch(), который позволяет получать ресурсы по сети асинхронно.

Метод `fetch()` возвращает Promise после вызова.
```
fetch('http://example.com/movies.json') // GET-запрос
  .then((response) => {
    return response.json(); // .json() тоже возвращает Promise
  })
  .then((data) => {
    console.log(data);
  });
```

Отправка запросов с другими методами - настройки передаются объектом:
```
fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({"name": "Alex"}),
        headers: {
            'Content-type': 'application/json'
        }
    })
```

> fetch обрабатывает ошибки протокола (404, 502 и т.п.), Promise внутри не выкинет reject, это не считается ошибкой, выполнится resolve. Reject выполнится только при сбое сети и подобном, когда что-то помешало запросу в принципе выполниться.

### Методы перебора массивов
1. `filter(условие)` - возвращает новый массив, удовлетворяющий условию. 
2. `map()` - позволяет изменить исходный массив, возвращая новый.
```
const answers = ['IvAn', 'AnnA', 'HellFHF'];
const result = answers.map(ans => ans.toLowerCase());
console.log(result); // ['ivan', 'anna', 'hellfhf']
```
3. `every()` - возвращает boolean значение. Если все элементы удовлетворяют условию, возвращает true. 
4. `some(условие)`- возвращает boolean значение. Если хотя бы один элемент удовлетворяет условию, возвращает true.
5. `reduce((result, current) => {function}, start)` - собирает массив в одну сущность и возвращает ее. `result` - собирает в себя результат и изначально равен 0, 1, пустой строке в зависимости от операции, `current` - каждый элемент приходящий от массива. `start` - необязательный параметр, result в начале примет это значение
```
const arr = [4, 5, 1, 3, 2, 6];
const result = arr.reduce((sum, current) => sum + current);
1. sum = 0, current = 4
2. sum = 4, current = 5 ...
```

> Удобный способ преобразования объекта в массив `Object.entries(neededObj)`

### NPM
Установка json-server:
`npm install json-server -g --save-dev`

### Получение данных с сервера. Async/Await
При выполнении промиса может случиться такое, что дальше по коду он используется в синхронном виде, что приведет к ошибке, т.к. до выполнения запроса в промисе будет null. Для избегания такой ситуации существуют `Async/Await`.

`Async` ставится перед функцией, в которой есть одновременно синхронные и асинхронные действия, `await` ставится перед операцией, которую нужно дождаться:
```
const postData = async (url, data) => {
        const result = await fetch(url, {
            ...
        });

        return await result.json();
    };
```

### Библиотеки: axios
Ресурс для взаимодействия с сервером, в который встроено много доп возможностей, например, обработка ошибок запросов внутри.

### Работа с localStorage
Свойство глобального объекта window, встроенного в браузер, который может хранить данные страницы даже после ее закрытия.
`localStorage` - объект (key-value).

Команды работы с localStorage:
1. setItem('key', 'value') - добавление значения в глобальный объект. Если ключ уже есть, значение просто перезапишется.
2. getItem('key')
3. removeItem('key') - убирает значение из глобального объекта
4. clear() - полностью очищает глобальное хранилище

### Регулярные выражения
Создание:
1. `new RegExp('pattern), 'flags`
2. `/pattern/`

Методы:
1. `string.search(pattern)` - ищет первое вхождение и отдает его индекс
2. `match(pattern)` - отдает все совпавшие части строки
3. `replace(pattern, newString)`
4. `pattern.test(string)` - если совпадение с паттерном есть, выведет true.


Различные флаги к регуляркам (`/pattern/flag`), их можно комбинировать:
1. `i` - независимо от регистра
2. `g` - ищет несколько вхождений
3. `m` - поддерживает многострочный режим

Шаблоны:
1. `\d` - все цифры, `\D` - не числа
2. `\w` - все буквы, `\W` - не буквы
3. `\s` - пробелы, `\S` - не пробелы

### Геттеры и сеттеры (свойства объектов)
https://learn.javascript.ru/property-accessors

Есть два типа свойств объекта:
1. свойства-данные (data properties). 
2. свойства-аксессоры (accessor properties). По своей сути это функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.
```
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },

  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};
```
### Инкапсуляция
Механизм, который объединяет данные и код, манипулирующий зтими данными, а также защищает и то, и другое от внешнего вмешательства или неправильного использования.

Создать переменную, которая недоступна снаружи:
```
function User(name, age) {
    let userAge = age; // 27
}
console.log(this.userAge) // undefined

либо 
class User {
    constructor(age) {
        this._age = age; // подчеркивание указывает программистам, что поле приватное
    }
}
```
