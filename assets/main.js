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
    "font-size":"60px",
    "color":"#600000",
    "text-shadow": "3px 2px 8px black",
    "position":"absolute","bottom":2,"left":"10px",

  });

  // Init score
  $("#score")
  .css(
  {
    "background":"rgba(0,0,0,0)", "opacity":"0.9",
    "font-size":"50px",
    "position":"absolute","bottom":0,"right":"10px",
    "color":"rgb(232, 255, 6)",
    "text-shadow": "3px 2px 8px black",

  });
  $("#sval")
    .text("0/9")
  .css(
  {
    "background":"rgba(0,0,0,0)", "opacity":"0.9",
    "font-size":"50px",
    "position":"relative", "right":"-2px"
  });

	DEMO.initialize('canvas-3d');

	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);

  mainLoop();
});
