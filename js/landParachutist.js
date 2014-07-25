var foo = null; // object landParachutist with temp name for now
var containerWidth = document.getElementById('container').offsetWidth; 
var containerHeight = document.getElementById('container').offsetHeight; 
var fooWidth = document.getElementById('landParachutist').offsetWidth;
var fooHeight = document.getElementById('landParachutist').offsetHeight;

function doMove() {
	var positionLeft = parseInt(foo.style.left) + 1;
	foo.style.left = positionLeft + 'px';
	setTimeout(doMove,5); // call doMove in 20msec
	
	//we make sure foo stops next to the wepon in the middle
	if (positionLeft >= containerWidth/2 - fooWidth) {
		doStop();
	}
}

//malko dyrvarski za sega, ama spira... :)
function doStop(){
	while(true){
		var positionLeft = containerWidth/2 - fooWidth;
	}
}

function init() {
	foo = document.getElementById('landParachutist'); // get the "foo" object
	foo.style.top = containerHeight - fooHeight + 'px';
	foo.style.left = '0px'; // set its initial position to 0px on horizontal
	doMove(); // start animating
}


window.onload = init;