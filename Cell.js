class Cell {
    constructor(x, y, w, h, color, X, Y) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.X = X;
        this.Y = Y;
    }
    show() {
        if (COLOR === 0) {
            colorMode(RGB, 1, 1, 1);
            stroke(this.color);
            fill(this.color);
        } else {   
            colorMode(HSB, 1, 1, 1);
            stroke(1 - this.color, 1 - this.color, 1 - this.color);
            fill(this.color, this.color, this.color);
        }
        rect(this.x, this.y, this.w, this.h);
    }
}