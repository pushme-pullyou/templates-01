// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/file-reader
// 2020-01-27
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const FRG = {};


FRG.init = function () {

	FRGdivFileReaderGeneric.innerHTML += FRG.getMenu();

};



FRG.getMenu = function () {

	const htm = `
<details open>

	<summary>
		Open a file on your computer

		<span class="couponcode">??<span class="coupontooltip">
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank">file reader on mdn</a>

			open a files on your computer

		</span></span>

	</summary>

	<!-- accept = '.rad, .res, .pts' multiple -->

	<p>
		<input type=file id=FRGinpFile onchange=FRG.openFile(this);  >
	</p>

	<p id=FRGpStats ></p>

	<textarea id=FRGtxtArea style=height:50rem;overflow:auto;width:100%; ></textarea>

</details>`;

	return htm;

};


FRG.openFile = function ( files ) {

	FRG.timeStart = performance.now();

	const reader = new FileReader();
	reader.onload = ( event ) => {

		FRG.files = files;
		FRG.result = reader.result;

		//FRG.onLoad();

		FRG.event = new Event( "onloadFileReader", {"bubbles": true, "cancelable": false, detail: true } );

		window.addEventListener( "onloadFileReader", FRG.onLoad, false )

		window.dispatchEvent( FRG.event );

	};

	reader.readAsText( files.files[ 0 ] );

};



FRG.onLoad = function () {

	FRGtxtArea.value = FRG.result.slice( 0, 1000 );

	const files = FRG.files;

	FRGpStats.innerHTML = `
		name: ${ files.files[ 0 ].name }<br>
		size: ${ files.files[ 0 ].size.toLocaleString() } bytes<br>
		type: ${ files.files[ 0 ].type }<br>
		modified: ${files.files[ 0 ].lastModifiedDate.toLocaleDateString() }<br>
		time to load: ${ ( performance.now() - FRG.timeStart ).toLocaleString() } ms`;

	//console.log( 'FRG files', files.files );
	//console.log( 'FRG event', event );

};


FRG.init();