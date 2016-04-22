function makeTimer() {
  var cnt = document.querySelector('#timer');
  var cntVal = cnt.innerHTML;
  cntVal = parseInt(cntVal)-1;
  cnt.innerHTML = cntVal;
  if(cntVal === parseInt("0")) {
    clearInterval(cmp);
    alert("GAME OVER");
    var href = 'index.html';
    $(location).attr('href', 'index.html');
  }





/*  var endTime = new Date("april 16, 2013 18:00:00 PD");
  var endTime = (Date.parse(endTime)) / 1000;

  var now = new Date();
  now = (Date.parse(now) / 1000);

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
  var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
  var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

//  if (seconds < "10") { seconds = "0" + seconds; }

  $("#seconds").html(seconds + "<span>Seconds</span>");*/
}

/*setInterval(function() { makeTimer(); }, 1000);

    //Starts from time of page load
$('#seconds').countdown({until: '+0h +0m +8s', format: 'HMS',onExpiry: liftOff,});

//Counts by Date
$('#seconds').countdown({until: new Date(2012, 11-1, 17, 10, 10, 10), format: 'HMS',onExpiry: liftOff,});

//Time is up!
function liftOff() {
   alert('Time is up!');
}*/
