function mainLoop() {
    requestAnimationFrame(mainLoop);
    DEMO.update();
}

$(function() {
	WINDOW.initialize();

  // Init timer
  $("#timer")
    .text("60")
  .css(
  {
    "background":"rgba(0,0,0,0)", "opacity":"0.9",
    "font-size":"40px",
    "position":"absolute", "bottom":"0", "left":"4px"
  });

  // Init score
  $("#score")
  .css(
  {
    "background":"rgba(0,0,0,0)", "opacity":"0.9",
    "font-size":"40px",
    "position":"absolute", "bottom":"0px", "right":"0px"
  });
  $("#sval")
    .text("0")
  .css(
  {
    "background":"rgba(0,0,0,0)", "opacity":"0.9",
    "font-size":"40px",
    "position":"relative", "left":"3px"
  })

	DEMO.initialize('canvas-3d');

	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);

  mainLoop();
});
