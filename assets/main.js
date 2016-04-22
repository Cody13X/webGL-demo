function mainLoop() {
    requestAnimationFrame(mainLoop);
    DEMO.update();
}

$(function() {
	WINDOW.initialize();

	DEMO.initialize('canvas-3d');

  //Starts from time of page load
/*$('#seconds').countdown({until: '+0h +0m +8s', format: 'HMS',onExpiry: liftOff,});

//Counts by Date
$('#seconds').countdown({until: new Date(2012, 11-1, 17, 10, 10, 10), format: 'HMS',onExpiry: liftOff,});*/

	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);

  mainLoop();
});
