class Grid {
    constructor() {
        this.set_cells();
        this.w = this.cells.length;
        this.h = this.cells[0].length;
        this.X = 0;
        this.Y = 0;
    }
    set_cells() {
        let cell_w = Math.floor(RATIO * W);
        let cell_h = Math.floor(RATIO * H);
        let cell_x_count = Math.floor(W / cell_w);
        let cell_y_count = Math.floor(H / cell_h);
        this.pad_x = (W - cell_x_count * cell_w) / 2;
        this.pad_y = (H - cell_y_count * cell_h) / 2;

        this.cells = [];
        this.cols = [];
        this.rows = [];
        this.fixed = [];
        this.coeffs = [];

        for (let i = 0; i < cell_x_count; i++) {
            this.cells[i] = [];
            this.fixed[i] = [];
            this.coeffs[i] = [];
            this.cols[i] = 0;
            for (let j = 0; j < cell_y_count; j++) {
                this.cells[i][j] = new Cell(i * cell_w + this.pad_x, j * cell_h + this.pad_y, cell_w, cell_h, 0, i, j);
                this.rows[j] = 0;
                this.fixed[i][j] = 0;
                this.coeffs[i][j] = 0;
            }
        }
    }
    set_color() {
        for (let i = 0; i < this.w; i++) {
            this.cols[i] = Math.cos(this.X * Math.PI * i / this.w);
        }
        for (let i = 0; i < this.h; i++) {
            this.rows[i] = Math.cos(this.Y * Math.PI * i / this.h);
        }
    }
    contains() {
        this.X = Math.ceil(mouseX / this.cells[0][0].w) - 1;
        this.Y = Math.ceil(mouseY / this.cells[0][0].h) - 1;
        this.set_color();

    }
    choose_values() {
        let c = map(mouseY, H, 0, 0, 1);
        for(let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                let C = map(c * this.cols[i] * this.rows[j] + this.fixed[i][j], -1, 1, 0, 1);
                this.cells[i][j].color = C;
                this.cells[i][j].show();
            }
        }
    }
    set_values() {
        let c = map(mouseY, H, 0, 0, 1);
        this.coeffs[this.X][this.Y] = c;
        for(let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                this.fixed[i][j] += c * this.cols[i] * this.rows[j];
            }
        }
    }
    show() {
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                let c = map(this.cols[i] * this.rows[j] + this.fixed[i][j], -1, 1, 0, 1);
                this.cells[i][j].color = c;
                this.cells[i][j].show();
            }
        }
    }
    clear() {
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                this.coeffs[i][j] = 0;
                this.fixed[i][j] = 0;
            }
        }
    }
}