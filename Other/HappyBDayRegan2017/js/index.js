var mycanvas;
var field;
var stars = 200;
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);;
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
init();

function init() {
	mycanvas = new canvas(w, h, "starfield");
	field = new starfield3D(mycanvas, stars, 11, w, h, w / 2, h / 2, '#FFF', 100, 0, 0);
	go();
}

function go() {
	mycanvas.fill('#000');
	field.draw();
	requestAnimFrame(go);
}