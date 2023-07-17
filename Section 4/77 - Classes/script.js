'use strict';

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle {
    constructor(height, width, text, bgColor) {
        super(height, width);
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps() {
        console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    }
}

const myRectangle = new Rectangle(30, 2);
console.log(myRectangle.calcArea());

const bgRectangle = new ColoredRectangleWithText(25, 10, "my text", "blue");
console.log(bgRectangle.calcArea());
bgRectangle.showMyProps();