let canvas;
let ctx;
let img;
let mouseX = 0;
let mouseY = 0;
let weight = 20;
let direction = 1;

// body onload="start()"
function start() {
	canvas = document.getElementById('forest');
	ctx = canvas.getContext('2d');
	load();
	animate();
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
	// For performance. Clears canvas pixels; without this it slows down the longer it runs
	ctx.clearRect(0,0, canvas.width, canvas.height);
	// Position left
	drawImage(false, 0, 0, w, canvas.height);
	// Flip middle image. Position middle, w
	drawImage(true, w, 0, w, canvas.height);
	// Position right, w*2
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

	speed(.004);

	// Limits of image scrolling
	if (mouseX >= 2) {
		direction = -1;
	}
	else if (mouseX <= -2) {
		direction = 1;
	}
	draw();

	window.requestAnimationFrame(animate);
}

// Speed of effect.
function speed(a) {
	mouseX += a * direction;
}

document.getElementById("light").addEventListener("click", function() {
	img.src = "forest.jpeg";
	document.querySelector("h1").style.color = "white";
	document.querySelector("h1").innerHTML = "LIGHT";
});

document.getElementById("dark").addEventListener("click", function() {
	img.src = "hands.jpg";
	document.querySelector("h1").style.color = "black";
	document.querySelector("h1").innerHTML = "DARK";
});

// Weight control function

document.getElementById("slider").addEventListener("change", function() {
	weight = document.getElementById("slider").value;
	document.getElementById("weight_value").innerHTML = weight;
});


