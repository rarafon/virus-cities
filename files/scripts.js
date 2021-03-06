// Page is for onload function for window

// Global objects put here:
var canvas,
	uiCanvas,
	ctx,
	uictx,
	menu,
	status_display,
	p1; // player 1

window.addEventListener("load", function(e) {
	// Make canvas, set display.width & height with display.setWidthHeight,
	// set ui.width & height with ui.setWidthHeight.
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		canvas_widthratio = 4/5,
		ui_widthratio = 1/5,
		blockSize = 25,
		statusHeight = 50;

	display.blockSize = 25;

	height *= 0.95;

	// width & height blocks are the blocks across the canvas shown
	var heightBlocks = Math.floor(height / blockSize),
		widthBlocks = Math.floor(width * canvas_widthratio / blockSize);

	height = heightBlocks * blockSize;
	cwidth = widthBlocks * blockSize;
	display.setMaxBlocks([widthBlocks, heightBlocks]);

	var menuWidth = width - cwidth - 40;

	// Global object initialization
	menu = document.getElementById("menu");
	canvas = document.getElementById("game-canvas");
	uiCanvas = document.getElementById("ui-canvas");
	canvas_container = document.getElementById("canvases");
	status_display = document.getElementById("status_display");

	var menus = document.getElementById("menu_container");

	display.setWidthHeight(cwidth, height);
	ui.setWidthHeight( menuWidth, height - statusHeight);
	pstatus.setWidthHeight( menuWidth, statusHeight);
	canvas_container.style.width = cwidth + "px";
	canvas_container.style.height = height + "px";
	menus.style.width = menuWidth + "px";
	menus.style.height = height + "px";
	controller.setOffset(canvas_container.offsetLeft, canvas_container.offsetTop);

	ctx = canvas.getContext('2d');
	uictx = uiCanvas.getContext('2d');
	uictx.font = ctx.font = '20pt Calibri';
	ctx.font = ctx.font = '20pt Calibri';

	// canvas click event listener
	uiCanvas.addEventListener('click', controller.clicked, false);
	uiCanvas.addEventListener('mousemove', controller.highlight, false);
	window.addEventListener('keydown', controller.keyPressed, false);

	controller.startMenu();
});