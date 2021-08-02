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

function deviceShaken() {
    if (click_count === 0) {
        grid.clear();
    } 
    if (click_count === 1) {
        SET_STATE = 1;
    }
    if (click_count > 1) {
        SET_STATE = 0;
        click_count = 0;
    }
}

function touchStarted() {
    if (click_count === 0) {
        click_count += 1;
    } else {
        click_count = 0;
    }
}

function touchEnded() {
    if (SET_STATE === 0) {
        click_count = 0;
    } else {
        grid.set_values();
        SET_STATE = 0;
        click_count = 0;
    }
}

/*function mouseClicked() {
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
}*/

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

function reset() {
    W = window.innerWidth;
    H = window.innerHeight;
    createCanvas(W, H);
    background(0);
    grid = new Grid();
    draw();
}

window.addEventListener("resize", onResize);

function onResize() {
    reset();
}

window.addEventListener('load', () => {
    document.getElementById('info-button').addEventListener('click', () => {
        document.getElementById('info').classList.toggle('hidden');
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        reset();
    });

    document.getElementById('scale-dot').addEventListener('change', event => {
        RATIO = parseFloat(event.target.value);
        reset();
    });

    document.getElementById('style-select').addEventListener('change', event => {
        if (event.target.value === '1') {
            COLOR = 1;
        } else if (event.target.value === '2') {
            COLOR = 0;
        }
    });
    renderMathInElement(document.body);
});

