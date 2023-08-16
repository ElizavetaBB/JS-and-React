function cards() {
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
}

export default cards;