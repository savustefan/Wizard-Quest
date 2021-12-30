const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let hero = new Image();
hero.onload = function (){
    ctx.drawImage(hero, wizard.x, wizard.y, wizard.w, wizard.h)
};
hero.src = "assets/wizard.png";

let lootImage = new Image();
lootImage.onload = function () {
    ctx.drawImage(lootImage, loot.x, loot.y)
}
lootImage.src = "assets/scroll.png";


const loot = {
    x:  0,
    y:  0,
    dx: 0,
    dy: 0
}

const wizard = {
    w: 50,
    h: 70,
    x: 0,
    y: 0,
    speed: 10,
    dx: 0,
    dy: 0
};

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.drawImage(hero, wizard.x, wizard.y, wizard.w, wizard.h);
}

function drawLoot(){
    ctx.drawImage(lootImage, loot.x, loot.y);
}

function newPos() {
    wizard.x += wizard.dx;
    wizard.y += wizard.dy;

    detectWalls();
    detectLoot();
}

function detectWalls() {
    // Left wall
    if (wizard.x < 0) {
        wizard.x = 0;
    }

    // Right Wall
    if (wizard.x + wizard.w > canvas.width) {
        wizard.x = canvas.width - wizard.w;
    }

    // Top wall
    if (wizard.y < 0) {
        wizard.y = 0;
    }

    // Bottom Wall
    if (wizard.y + wizard.h > canvas.height) {
        wizard.y = canvas.height - wizard.h;
    }
}

const reset = function () {
    loot.x = (Math.random() * (canvas.width - 64));
    loot.y = (Math.random() * (canvas.width - 64));
}
function detectLoot(){
    if (wizard.x <= (loot.x + 32) && loot.x <= (wizard.x + 32) && loot.y <= (wizard.y + 32)){
     reset();
    }
}

function update() {
    clear();

    drawPlayer();

    drawLoot();

    newPos();

    requestAnimationFrame(update);
}

function moveUp() {
    wizard.dy = -wizard.speed;
}

function moveDown() {
    wizard.dy = wizard.speed;
}

function moveRight() {
    wizard.dx = wizard.speed;
}

function moveLeft() {
    wizard.dx = -wizard.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    }
}

function keyUp(e) {
    if (
        e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft' ||
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown'
    ) {
        wizard.dx = 0;
        wizard.dy = 0;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);