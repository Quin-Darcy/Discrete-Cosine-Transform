// Display 
let W = window.innerWidth;
let H = window.innerHeight;

// Grid
let COLOR = 1;
let RATIO = 0.03;
let SET_STATE = 0;
let grid;

// UI
let click_count = 0;

function setup() {
    createCanvas(W, H);
    background(0);
    grid = new Grid();
}

function mouseClicked() {
    if (click_count === 0) {
        click_count += 1;
        SET_STATE = 1;
        return;
    }
    if (click_count === 1) {
        click_count = 0;
        grid.set_values();
        SET_STATE = 0;
    }
}

function doubleClicked() {
    grid.clear();
}

function draw() {
    background(0);
    if (SET_STATE === 0) {
        if ((0 < mouseX) && (mouseX < W) && (0 < mouseY) && (mouseY < H)){
            grid.contains();
        }
        grid.show(); 
    } else {
        grid.choose_values();
    }
}