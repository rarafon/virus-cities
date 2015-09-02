// Page is for onload function for window
var canvas,
	uiCanvas,
	ctx,
	menu,
	status_display;

window.addEventListener("load", function(e) {
	// Make canvas, set display.width & height with display.setWidthHeight,
	// set ui.width & height with ui.setWidthHeight.
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		canvas_widthratio = 4/5,
		ui_widthratio = 1/5,
		blockSize = display.blockSize,
		statusHeight = 100;

	height *= 0.95;

	// width & height blocks are the blocks across the canvas shown
	var heightBlocks = Math.floor(height / blockSize),
		widthBlocks = Math.floor(width * canvas_widthratio / blockSize);

	height = heightBlocks * blockSize;
	cwidth = widthBlocks * blockSize;
	display.setMaxBlocks([widthBlocks, heightBlocks]);

	var menuWidth = width - cwidth - 40;

	menu = document.getElementById("menu");

	canvas = document.getElementById("game-canvas");
	uiCanvas = document.getElementById("ui-canvas");
	canvas_container = document.getElementById("canvases");
	status_display = document.getElementById("status_display");

	var menus = document.getElementById("menus");

	display.setWidthHeight(cwidth, height);
	ui.setWidthHeight( menuWidth, height - statusHeight);
	pstatus	.setWidthHeight( menuWidth, statusHeight);
	canvas.width = cwidth;
	canvas.height = height;
	uiCanvas.width = cwidth;
	uiCanvas.height = height;
	canvas_container.style.width = cwidth + "px";
	canvas_container.style.height = height + "px";
	menus.style.width = menuWidth + "px";
	menus.style.height = height + "px";

	ui.changeMenu();
	pstatus.changeMenu();

	ctx = canvas.getContext('2d');
	ctx.font = '20pt Calibri';

	// canvas click event listener
	canvas.addEventListener('click', display.click, false);
	canvas.addEventListener('mousemove', display.highlight, false);

	display.displayStartMenu();
});