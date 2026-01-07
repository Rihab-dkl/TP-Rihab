const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


let posX = 180;
let posY = 180;


let frameX = 0;
let frameY = 0;


let fw = 0;
let fh = 0;

const sprite = new Image();
sprite.src = "sprites.png";

const background = new Image();
background.src = "pelouse.png";

let bgReady = false;
let spriteReady = false;


background.onload = () => {
  bgReady = true;
  drawScene();
};


sprite.onload = () => {
  spriteReady = true;
  fw = sprite.width / 4;
  fh = sprite.height / 4;
  drawScene();
};

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  if (bgReady) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  } else {
 
    ctx.fillStyle = "#6abf4b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }


  if (spriteReady && fw && fh) {
    ctx.drawImage(
      sprite,
      frameX * fw, frameY * fh, fw, fh,
      posX, posY,
      fw * 0.6, fh * 0.6
    );
  }
}

document.addEventListener("keydown", (e) => {
  if (!spriteReady) return;

  const speed = 7;

  switch (e.key) {
    case "ArrowDown":
      frameY = 0;
      posY += speed;
      break;
    case "ArrowUp":
      frameY = 1;
      posY -= speed;
      break;
    case "ArrowLeft":
      frameY = 2;
      posX -= speed;
      break;
    case "ArrowRight":
      frameY = 3;
      posX += speed;
      break;
    default:
      return;
  }

  
  frameX = (frameX + 1) % 4;


  const wAff = fw * 0.6;
  const hAff = fh * 0.6;

  if (posX < 0) posX = 0;
  if (posY < 0) posY = 0;
  if (posX > canvas.width - wAff) posX = canvas.width - wAff;
  if (posY > canvas.height - hAff) posY = canvas.height - hAff;

  drawScene();
});


drawScene();
