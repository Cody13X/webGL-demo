function makeTimer() {
  var tmr = document.querySelector('#timer');
  var tmrVal = tmr.innerHTML;
  tmrVal = parseInt(tmrVal)-1;
  tmr.innerHTML = tmrVal;
  if( tmrVal === parseInt("0") ) {
    // Show the 3d game over text
/*    var cam = DEMO.pipo();
    cam.updateProjectionMatrix();
    var zCamVec = new THREE.Vector3(0,0,1);
    var position = cam.localToWorld(zCamVec);
    textMesh.position.set(position.x,0, position.z);
    textMesh.lookAt(position);*/
/*    var vec = new THREE.Vector3( 0, 0, -100 );
vec.applyQuaternion( cam.quaternion );

textMesh.position.copy( vec );
    scene.add(textMesh);*/

    // Game over alerts
    if(cnt === 9)
      alert('Si proche ! Et pourtant si loin...');

    if(cnt === 8)
      alert('Pas mal tu y es presque');

    if(cnt === 7)
      alert('Ca va trop vite ?');

    if(cnt === 6)
      alert("Je sais, c'est les caisses qui sont trop carrées");

    if(cnt === 5)
      alert('Waouh encore cinq et tu gagnais lol');

    if(cnt === 4)
      alert('Crampe du bras droit ?');

    if(cnt === 3)
      alert("Tu n'étais pas très chaud chaud c'est ça ?");

    if(cnt === 2)
      alert('Les jeux vidéo et toi ça fait deux');

    if(cnt === 1)
      alert('Mais tu es handicapé des doigts ou quoi ?');

    if(cnt === 0)
      alert('Change rien tu es le meilleur');

/*    var href = 'index.html';
    $(location).attr('href', 'index.html');*/
    // Release timer
    clearInterval(cmp);

    swal({
      title: '',
      text: 'Replay ?',
      imageUrl: 'css/gameover.png',
    },
    function(){
     window.location.href = 'index.html';
   });
  }
}
