const cv = document.getElementById("zone");
const c = cv.getContext("2d");

let current = 0;


function wipe() {
    c.clearRect(0, 0, cv.width, cv.height);
}

/* ------------------------------
   1) Cercle
--------------------------------*/
function circles() {
    wipe();

    const x = cv.width / 2;
    const y = cv.height / 2;

    const inner = 28;
    const strokeSize = 14;

    // centre
    c.beginPath();
    c.fillStyle = "crimson";
    c.arc(x, y, inner, 0, Math.PI * 2);
    c.fill();

    // premier cercle
    c.beginPath();
    c.lineWidth = strokeSize;
    c.strokeStyle = "#000";
    c.arc(x, y, inner + strokeSize / 2, 0, Math.PI * 2);
    c.stroke();

    // cercles
    const list = [55, 85, 115, 145];
    list.forEach(r => {
        c.beginPath();
        c.lineWidth = strokeSize;
        c.arc(x, y, r, 0, Math.PI * 2);
        c.stroke();
    });
}


/* ------------------------------
   2) La grille et la poule
--------------------------------*/
function chicken() {
    wipe();

    const startX = 50;
    const startY = 50;
    const box = 33;
    const grid = 10;

    c.lineWidth = 1;
    c.strokeStyle = "#bfbfbf";

    for (let i = 0; i <= grid; i++) {
        c.beginPath();
        c.moveTo(startX + i * box, startY);
        c.lineTo(startX + i * box, startY + grid * box);
        c.stroke();

        c.beginPath();
        c.moveTo(startX, startY + i * box);
        c.lineTo(startX + grid * box, startY + i * box);
        c.stroke();
    }

    const px = (a, b) => [startX + a * box, startY + b * box];

    c.lineWidth = 3;
    c.strokeStyle = "#000";

    const lines = [
        [2,2,4,2], [2,2,4,4], [4,2,5,3], [5,3,7,3],
        [7,3,8,2], [8,2,8,3], [8,3,9,3], [9,3,8,4],
        [8,4,9,4], [9,4,7,6], [7,6,7,7.4], [7,6,5,6],
        [5,6,4,5], [4,5,4,4], [3,3,3,1.6],

        
        [3,2,3,1.6], [3,1.6,3.4,1.8], [3.4,1.8,3.6,1.6],
        [3.6,1.6,3.8,1.8], [3.8,1.8,4,1.6], [4,1.6,4,2],

        
        [5,7,4,7], [5,7,4.5,7.4], [5,7,5,6.5],
        [7,7,6,7], [7,7,6.6,7.4], [7,7,7,7.4]
    ];

    lines.forEach(([x1,y1,x2,y2]) => {
        const [a,b] = px(x1,y1);
        const [c2,d2] = px(x2,y2);
        c.beginPath();
        c.moveTo(a,b);
        c.lineTo(c2,d2);
        c.stroke();
    });

 
    c.beginPath();
    const [ox, oy] = px(3.25, 2.35);
    c.fillStyle = "#000";
    c.arc(ox, oy, 3.7, 0, Math.PI*2);
    c.fill();
}


/* ------------------------------
   3) echec
--------------------------------*/
function checker() {
    wipe();

    const cells = 10;
    const size = 34;
    const total = cells * size;

    const sx = (cv.width - total) / 2;
    const sy = (cv.height - total) / 2;

    for (let r = 0; r < cells; r++) {
        for (let col = 0; col < cells; col++) {
            c.fillStyle = ((r + col) % 2 === 0) ? "#000" : "#fff";
            c.fillRect(sx + col * size, sy + r * size, size, size);
        }
    }

    c.lineWidth = 2;
    c.strokeStyle = "#000";
    c.strokeRect(sx, sy, total, total);
}


/* ------------------------------
   4) Quadrillage courbe
--------------------------------*/
function warp() {
    wipe();

    const xStart = 70;
    const yStart = 70;
    const side = 360;
    const slices = 48;
    const step = side / slices;

    c.strokeStyle = "#000";
    c.lineWidth = 1;
    c.strokeRect(xStart, yStart, side, side);

 
    for (let i = 0; i <= slices; i++) {
        c.beginPath();
        c.moveTo(xStart, yStart + i * step);
        c.lineTo(xStart + i * step, yStart + side);
        c.stroke();

        c.beginPath();
        c.moveTo(xStart + i * step, yStart);
        c.lineTo(xStart + side, yStart + i * step);
        c.stroke();
    }
}


/* ------------------------------
   Gestion btn
--------------------------------*/
const allFigures = [circles, chicken, checker, warp];

document.getElementById("btnNext").addEventListener("click", () => {
  current = (current + 1) % allFigures.length;
  allFigures[current]();
});


allFigures[0]();
