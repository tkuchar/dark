let canvas;
let ctx;
let img;
let mouseX = 0;
let weight = 20;
let direction = 1;

function start() {
	canvas = document.getElementById('forest');
	ctx = canvas.getContext('2d');
	load();
}

function load() {
	img = new Image();
	img.addEventListener('load', init, false);
	img.src = 'forest.jpeg';
}

function init() {
	window.addEventListener('resize', resize, false);
	// canvas.addEventListener('mousemove', move);
	resize();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	draw();
}

// Splitting the canvas into three parts
function draw() {
	let w = canvas.width / 3;
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawImage(false, 0, 0, w, canvas.height);
	drawImage(true, w, 0, w, canvas.height);
	drawImage(false, w*2, 0, w, canvas.height);
}

function drawImage(flip, x, y, w, h) {
	// take snapshot of our current transformation maxtrix
	ctx.save();

	let hW = w / 2;
	let hH = h / 2;
	let sourceRect = getSourceRect(w,h);

	ctx.translate(x,y);
	ctx.translate(hW,hH);
	ctx.scale(flip ? -1 : 1, 1);

	ctx.drawImage(
		img,
		sourceRect.x - (mouseX * weight),
		sourceRect.y,
		sourceRect.w,
		sourceRect.h,
		-hW,
		-hH,
		w,
		h,
	);

	ctx.restore();
}

function getSourceRect(srcW, srcH) {
	const destW = img.naturalWidth;
	const destH = img.naturalHeight;

	const scale = Math.min(destW / srcW, destH / srcH);

	const scaledSrcW = srcW * scale;
	const scaledSrcH = srcH * scale;

	const startX = (destW - scaledSrcW) * 0.5;
	const startY = (destH - scaledSrcH) * 0.5;
	return {
		x: startX,
		y: startY,
		w: scaledSrcW,
		h: scaledSrcH,
	};
}

// For effect on mouse move.

/* function move(e) {
	mouseX = (e.clientX / canvas.width);
	draw();
}*/

function animate() {

	// Speed of effect. Direction tells the effect to go right or left.
    mouseX += 0.005 * direction;

	// Limits of image scrolling
	if (mouseX >= 4) {
		direction = -1;
	}
	else if (mouseX <= -4) {
		direction = 1;
	}

	draw();
    // Loop?
	window.requestAnimationFrame(animate);
}

document.getElementById("toggle_scroll").addEventListener("click", animate);

