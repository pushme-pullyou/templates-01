

const OVG = {};


OVG.objData = [

	"Mr.doob",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/cerberus/Cerberus.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/emerald.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02_vertex_colors.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/male02/male02.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/tree.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/verify/verify.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/vive-controller/vr_controller_vive_1_5.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/walt/WaltHead.obj",
	"https://rawcdn.githack.com/mrdoob/three.js/master/examples/models/obj/female02/female02.obj",

	"josdirksen",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/GuyFawkesMask_Cycles.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/butterfly.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/city.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/jessica/jessica.obj",
	"https://rawcdn.githack.com/josdirksen/learning-threejs/master/assets/models/pinecone.obj",

	"assimp",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models-nonbsd/OBJ/rifle.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models-nonbsd/OBJ/segment.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/WusonOBJ.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/box.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/box_UTF16BE.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/empty_mat.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/regr01.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/space_in_material_name.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/spider.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/OBJ/testline.obj",
	"https://rawcdn.githack.com/assimp/assimp/master/test/models/invalid/malformed2.obj",

	"jaanga/3d-models",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/a-330/a-330.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/saab-37-viggen/saab-37-viggen.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/aircraft/tu-160-blackjack/tu-160-blackjack.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/barcelona-pavilion/barcelona-pavilion.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/factory-complex/factory-complex.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/robie-house/robie-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/schroder-house/schroder-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/sydney-opera-house/sydney-opera-house.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/architecture/villa-savoye/villa-savoye.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/maschera.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/nefertiti/nefertiti.obj",
	"https://rawcdn.githack.com/jaanga/3d-models/gh-pages/obj/sculpture/pipa.ply.obj"
];



OVG.getMenu = function () {

	const options = OVG.getOptions();

	const htm =
	`
<details ontoggle=OVG.getScript();>

	<summary>OBJ viewer gallery</summary>

	<div id=divMessage >A curated list of OBJ files from around the internet. Some files are very large and take a long time to load. You may meed to zoom way in or way out to see the model.</div>

	<select id=selObj onchange=OVG.loadObj(this.value) size=30>${ options }</select>

	<p>
		<button onclick=getFilesObj(); >get files obj</button>
	</p>

	<p>
		Help for adding new files. See source code.
	</p>

	<div id=divFilesObj ></div>

</details>
	`;

	return htm;

}



OVG.getOptions = function() {

	const options = OVG.objData.map( ( item, index ) => {

		if ( item.startsWith( "http" ) ) {

			return `<option value=${ index }>${ item.split("/").pop() }</option>`;

		} else {

			return `<optgroup label="${ item }" ></optgroup>`;

		}

	} )

	return options;

}


OVG.getScript = function () {

	if ( !OVG.objLoader) {

		OVG.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		//OVG.objLoader = setEditContents;
		OVG.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}
}

OVG.loadObj = function ( index ) {

	const url = OVG.objData[ index ];
	const loader = new THREE.OBJLoader();

	loader.load (

		url,

		function ( object ) {

			window.dispatchEvent(eventResetAll);

			scene.remove( mesh );

			mesh = new THREE.Group();

			const meshes = object.children.map( obj => getObjMesh( obj ) );

			mesh.add( ...meshes );

			const bBox = new THREE.Box3().setFromObject( mesh );
			const radius = bBox.getBoundingSphere( new THREE.Vector3() ).radius;
			const scale = 100 / radius;
			mesh.scale.set( scale, scale, scale );
			mesh.position.y = -50;

			scene.add(mesh);

			controls.reset();

		},


		function ( xhr ) {

			divMessage.innerHTML = `<p>${ xhr.loaded.toLocaleString() } loaded</p>`;
			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			divMessage.innerHTML = `<p>An error happened: ${ error }</p>`;

		}
	);

}


function getObjMesh( mesh ) {

	mesh.material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, transparent: true } );

	return mesh;

}


function getFilesObj() {


	//url = "https://api.github.com/repos/mrdoob/three.js/git/trees/master?recursive=1";
	//prefix = "https://rawcdn.githack.com/mrdoob/three.js/master/";

	// url = "https://api.github.com/repos/assimp/assimp/git/trees/master?recursive=1";
	// prefix = "https://rawcdn.githack.com/assimp/assimp/master/";


	// url = "https://api.github.com/repos/jaanga/3d-models/git/trees/gh-pages?recursive=1";
	// prefix = "https://rawcdn.githack.com/jaanga/3d-models/gh-pages/";

	url = "https://api.github.com/repos/josdirksen/learning-threejs/git/trees/master?recursive=1";
	prefix = "https://rawcdn.githack.com/josdirksen/learning-threejs/master/"

	fetch( url )
	.then( response => response.json() )
	.then( json => {

		j = json;
		files = json.tree.filter( item => item.path.endsWith( ".obj" ) ).map( item => item.path )

		txt = files.map( item => `"${prefix }${ item }"` ).join( ",\n" )
		divFilesObj.innerHTML = `<textarea style=height:50ch;width:100%; >${ txt }</textarea>`;

		console.log( 'files', files  );

	} );

}
