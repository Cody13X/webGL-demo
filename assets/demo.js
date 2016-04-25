var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();
//timer
var cmp = 0;
//counter
var cnt = 0;

var DEMO = {
	ms_Canvas: null,
	ms_Renderer: null,
	ms_Camera: null,
	ms_Scene: null,
	//ms_Controls: null,
	ms_Water: null,
	ms_MovingBoat: null,
	Boat_up: true,
	Boat_dwn: false,
	collidableMeshList: [],

    enable: (function enable() {
        try {
            var aCanvas = document.createElement('canvas');
            return !! window.WebGLRenderingContext && (aCanvas.getContext('webgl') || aCanvas.getContext('experimental-webgl'));
        }
        catch(e) {
            return false;
        }
    })(),

	initialize: function initialize(inIdCanvas) {
		this.ms_Canvas = $('#'+inIdCanvas);

		// Initialize Renderer, Camera and Scene
		this.ms_Renderer = this.enable? new THREE.WebGLRenderer({antialias:true}) : new THREE.CanvasRenderer();
		this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.ms_Scene = new THREE.Scene();

		this.ms_Camera = new THREE.PerspectiveCamera(55.0, WINDOW.ms_Width / WINDOW.ms_Height, 0.5, 3000000);
		this.ms_Camera.position.set(0, /*10*/6.4, -970);
		this.ms_Camera.lookAt(/*new THREE.Vector3(0, 0, 0)*/this.ms_Scene.position);

		// Initialize Orbit control
		//this.ms_Controls = new THREE.OrbitControls(this.ms_Camera, this.ms_Renderer.domElement);

		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		this.ms_Scene.add(directionalLight);

		// Load textures
		var waterNormals = new THREE.ImageUtils.loadTexture('assets/img/waternormals.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

		// Create the water effect
		this.ms_Water = new THREE.Water(this.ms_Renderer, this.ms_Camera, this.ms_Scene, {
			textureWidth: 256,
			textureHeight: 256,
			waterNormals: waterNormals,
			alpha: 	1.0,
			sunDirection: directionalLight.position.normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			betaVersion: 0,
			side: THREE.DoubleSide
		});
		var aMeshMirror = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2000, 2000, 10, 10),
			this.ms_Water.material
		);
		aMeshMirror.add(this.ms_Water);
		aMeshMirror.rotation.x = - Math.PI * 0.5;

		this.ms_Scene.add(aMeshMirror);

		this.loadSkyBox();

		this.loadBoat(this.ms_Scene)

		// Load boxes
		var wallGeometry = new THREE.CubeGeometry( 6, 6, 2, 1, 1, 1 );
		var wallTexture = new THREE.ImageUtils.loadTexture( 'assets/img/caisse.jpg' );
		var wallMaterial = new THREE.MeshBasicMaterial( { map: wallTexture }  );

		var wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		z = Math.floor((Math.random() * 1300) -650);
		wall1.position.set(x, 0, z);
		wall1.name="wall1";
		this.ms_Scene.add(wall1);
		this.collidableMeshList.push(wall1);

		var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		z = Math.floor((Math.random() * 1300) -650);
		wall2.position.set(x, 0, z);
		wall2.name="wall2";
		this.ms_Scene.add(wall2);
		this.collidableMeshList.push(wall2);

		var wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		wall3.position.set(x, 0, z);
		wall3.name="wall3";
		this.ms_Scene.add(wall3);
		this.collidableMeshList.push(wall3);

		var wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		z = Math.floor((Math.random() * 1300) -650);
		wall4.position.set(x, 0, z);
		wall4.name="wall4";
		this.ms_Scene.add(wall4);
		this.collidableMeshList.push(wall4);

		var wall5 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		z = Math.floor((Math.random() * 1300) -650);
		wall5.position.set(x, 0, z);
		wall5.name="wall5";
		this.ms_Scene.add(wall5);
		this.collidableMeshList.push(wall5);

		var wall6 = new THREE.Mesh(wallGeometry, wallMaterial);
		x = Math.floor((Math.random() * 1300) -650);
		z = Math.floor((Math.random() * 1300) -650);
		wall6.position.set(x, 0, z);
		wall6.name="wall6";
		this.ms_Scene.add(wall6);
		this.collidableMeshList.push(wall6);

		cmp = setInterval('makeTimer();',2000);
	},

	loadBoat: function loadBoat(scene) {
		var loader = new THREE.JSONLoader(); // init the loader util
		// init loading
		loader.load('assets/model/Boat.js', function (geometry/*, materials*/) {
			// create a new material
  		//var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
			var material = new THREE.MeshLambertMaterial({
	  		map: THREE.ImageUtils.loadTexture('assets/model/Boat_D.jpg'),  // specify and load the texture
				colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
				colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
				colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
			});

			// create a mesh with models geometry and material
			var mesh = new THREE.Mesh(
				geometry,
				material
			);

			mesh.position.set(0, -1.6, -950);
		//	mesh.rotation.y = -Math.PI/5;

		  scene.add(mesh);
			this.ms_MovingBoat = mesh;
			var light = new THREE.AmbientLight(0xffffff);
    	scene.add(light);
		});
	},

	loadSkyBox: function loadSkyBox() {
		var aCubeMap = THREE.ImageUtils.loadTextureCube([
		  'assets/img/px.jpg',
		  'assets/img/nx.jpg',
		  'assets/img/py.jpg',
		  'assets/img/ny.jpg',
		  'assets/img/pz.jpg',
		  'assets/img/nz.jpg'
		]);
		aCubeMap.format = THREE.RGBFormat;

		var aShader = THREE.ShaderLib['cube'];
		aShader.uniforms['tCube'].value = aCubeMap;

		var aSkyBoxMaterial = new THREE.ShaderMaterial({
		  fragmentShader: aShader.fragmentShader,
		  vertexShader: aShader.vertexShader,
		  uniforms: aShader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});

		var aSkybox = new THREE.Mesh(
		  new THREE.BoxGeometry(1000000, 1000000, 1000000),
		  aSkyBoxMaterial
		);

		this.ms_Scene.add(aSkybox);
	},

    display: function display() {
		this.ms_Water.render();
		this.ms_Renderer.render(this.ms_Scene, this.ms_Camera);
	},

	update: function update() {
		this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
  	//this.ms_Controls.update();
		this.display();

		var delta = clock.getDelta(); // seconds.
		var moveDistance = 2/*0 * delta*/; // 200 pixels per second
		var rotateAngle = 0.005/*Math.PI / 16 * delta*/;   // pi/2 radians (90 degrees) per second

		// local transformations
	//console.log(this.ms_MovingBoat);
		// move forwards/backwards/left/right
/*		if ( keyboard.pressed("W") )
			MovingCube.translateZ( -moveDistance );*/
		if ( keyboard.pressed("up") ) {
			//get back from floating
			ms_MovingBoat.position.y = -1.6;
			ms_MovingBoat.translateZ(moveDistance);


			var relativeCameraOffset = new THREE.Vector3(0, 8, -18);
			var cameraOffset = relativeCameraOffset.applyMatrix4(ms_MovingBoat.matrixWorld);

			this.ms_Camera.position.x = cameraOffset.x;
			this.ms_Camera.position.y = cameraOffset.y;
			this.ms_Camera.position.z = cameraOffset.z;

			// collision detection
			var originPoint = ms_MovingBoat.position.clone();
			for (var vertexIndex = 0; vertexIndex < /*ms_MovingBoat.geometry.vertices.length*/1800; vertexIndex++)
			{
					var localVertex = ms_MovingBoat.geometry.vertices[vertexIndex].clone();
					var globalVertex = localVertex.applyMatrix4( ms_MovingBoat.matrix );
					var directionVector = globalVertex.sub( ms_MovingBoat.position );

					var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
					var collisionResults = ray.intersectObjects( this.collidableMeshList );
					if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
						this.removeEntity(collisionResults[0].object);
						break;
					}
			}
		}//keybord.pressed
		else {
			if(this.Boat_up && ms_MovingBoat.position.y < -1.3)
				ms_MovingBoat.position.y += Math.sin(delta/4);
			else {
				this.Boat_up = false;
				this.Boat_dwn = true;
			}

			if(this.Boat_dwn && ms_MovingBoat.position.y > -1.65)
				ms_MovingBoat.position.y -= Math.sin(delta/4);
			else {
				this.Boat_up = true;
				this.Boat_dwn = false;
			}
		}
/*		if ( keyboard.pressed("Q") )
			MovingCube.translateX( -moveDistance );
		if ( keyboard.pressed("E") )
			MovingCube.translateX(  moveDistance );*/

		// rotate left/right/up/down
		var rotation_matrix = new THREE.Matrix4().identity();
		if ( keyboard.pressed("left") )
			ms_MovingBoat.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
		if ( keyboard.pressed("right") )
			ms_MovingBoat.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);


/*		if ( keyboard.pressed("Z") )
		{
			MovingCube.position.set(0,25.1,0);
			MovingCube.rotation.set(0,0,0);
		}*/


		this.ms_Camera.lookAt(ms_MovingBoat.position);
	},

	removeEntity: function removeEntity(object) {
    var selectedObject = this.ms_Scene.getObjectByName(object.name);
		// Avoid multiple collision response
		if(selectedObject !== undefined) {
    	this.ms_Scene.remove(selectedObject);
			cnt++;
			// score
			var score = document.querySelector('#sval');
			score.innerHTML = cnt;
			// test final score
			if(cnt === 6)
				alert('YOU WIN !!!');
		}
	},

	resize: function resize(inWidth, inHeight) {
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize(inWidth, inHeight);
		this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.display();
	}
};
