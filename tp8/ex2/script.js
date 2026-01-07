const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");


const sprite = new Image();
const backgroundImg = new Image();

sprite.src = "mario.png";
backgroundImg.src = "fond.png";


let fw, fh;

let currentCol = 0;
let currentRow = 0;


let tick = 0;


let bgOffset = 0;


sprite.onload = () => {
    fw = sprite.width / 5;
    fh = sprite.height / 5;
};

function render() {


    bgOffset -= 1.8; 
    if (bgOffset <= -canvas.width) {
        bgOffset = 0;
    }

    ctx.drawImage(backgroundImg, bgOffset, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, bgOffset + canvas.width, 0, canvas.width, canvas.height);


    tick++;
    if (tick % 5 === 0) {  
        currentCol = (currentCol + 1) % 5;
    }

    ctx.drawImage(
        sprite,
        currentCol * fw, currentRow * fh, fw, fh,
        60, 260,
        fw * 1.15, fh * 1.15
    );

    requestAnimationFrame(render);
}

backgroundImg.onload = render;
