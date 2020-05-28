const version = "2020-05-27";

const urlJsonDefault = "https://cdn.jsdelivr.net/gh/xxxxx/xxxxx@master/ccccc.vvv";

aGithubHref = "https://github.com/HoareLea/sam-viewer/";

const description = `
Online interactive 3D viewer in your browser 
designed to be forked, hacked and remixed using the WebGL and the 
<a href="https://threejs.org" target="_blank">Three.js</a> JavaScript library
`;

const TMP = {
	json: {},
	group: new THREE.Object3D(),
};



let timeStart;

function init() {
	timeStart = performance.now();

	//aGlitch.href = aGlitchHref;

	aGithub.href = aGithubHref;

	divDescription.innerHTML = description;

	aTitle.innerHTML += ` ${version}`;

	THR.init();

	THR.animate();

	THR.group = THR.setSceneNew( TMP.group );

	THR.addMeshes();

	THR.updateGroup();

	HRT.initHeart();
}




//////////

function requestFile(url, callback, type = "json" ) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	//xhr.responseType = "json";
	xhr.onerror = xhr => console.log("error:", xhr);
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = xhr => callback(xhr.target.response);
	xhr.send(null);
}
