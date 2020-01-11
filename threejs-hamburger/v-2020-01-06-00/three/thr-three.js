/* global THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

let mesh, meshGroup;
let THR = {};

THR.sceneRotation = 1;

THR.init = function() {

	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 9999, 999999 );
	scene.add( camera );

	const renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxDistance = 500;
	controls.rotateSpeed = 2;
	//controls.maxPolarAngle = Math.PI * 0.5;


	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );
	window.addEventListener( 'keyup', () => THR.sceneRotation = 0, false );
	renderer.domElement.addEventListener( 'click', () => THR.sceneRotation = 0, false );

	THR.camera = camera; THR.scene = scene; THR.renderer = renderer; THR.controls = controls;

	addLights();

	//const axesHelper = new THREE.AxesHelper( 100 );
	//scene.add( axesHelper );

	THRT.toggleAxesHelper()

	//addGround();
	//THRT.toggleGroundHelper()

	addMesh();

	//addMeshes();


}


function addLights() {

	const scene = THR.scene;
	const camera = THR.camera;


	scene.add( new THREE.AmbientLight( 0x404040 ) );
	//scene.add( new THREE.AmbientLight( 0x666666 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.1 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	const light = new THREE.DirectionalLight( 0xdfebff, 0.5 );
	light.position.set( -50, -200, 100 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 100;
	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;
	light.shadow.camera.far = 500;
	scene.add( light );

	//scene.add( new THREE.CameraHelper( light.shadow.camera ) );

}



function addGround() {

	const geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, depthWrite: false, side: 2 } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.z = -50;
	mesh.receiveShadow = true;
	THR.scene.add( mesh );

}


function addMesh( size = 20 ) {

	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	const geometry = new THREE.BoxGeometry( size, size, size );

	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	//const material = new THREE.MeshNormalMaterial();
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), specular: 0xffffff } );
	mesh = new THREE.Mesh( geometry, material );
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	THR.scene.add( mesh );

	return mesh;

}



function addMeshes( count = 100 ) {

	THR.scene.remove( meshGroup );

	meshGroup = new THREE.Group();

	for ( let i = 0; i < count; i++ ) { meshGroup.add( addMesh() ) };

	meshGroup.children.forEach( mesh => {
		mesh.position.set( Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50 )
		mesh.rotation.set( 0.2 * Math.random(), 0.2 * Math.random(), 0.2 * Math.random() )
	} );

	THR.scene.add( meshGroup );

}



THR.onWindowResize = function () {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	THR.controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();
	THR.scene.rotation.z += THR.sceneRotation / 1000;

}