function makeTimer() {
  var tmr = document.querySelector('#timer');
  var tmrVal = tmr.innerHTML;
  tmrVal = parseInt(tmrVal)-1;
  tmr.innerHTML = tmrVal;
  if(tmrVal === parseInt("0")) {
    //release timer
    clearInterval(cmp);
  /*  var egme = document.querySelector('#endGame');
    egme.innerHTML = "GAME OVER !";*/
    alert("GAME OVER");
    var href = 'index.html';
    $(location).attr('href', 'index.html');
  }
}
