// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/file-reader
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const FRT = {};



FRT.init = function () {

	divContent.innerHTML += FRT.getMenu();

};



FRT.getMenu = function () {

	const htm = `
<details open>

	<summary>
		File reader

		<span class="couponcode">??? <span class="coupontooltip">
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank">file reader on mdn</a>
			aaa bbb cccc
		</span></span>

	</summary>

	<!-- accept = '.rad, .res, .pts' multiple -->

	<p>
		<input type=file id=FRTinpFile onchange=FRT.openFile(this);  >
	</p>

	<textarea id=FRTtxtArea style=height:500px;overflow:auto;width:100%; ></textarea>

	<p id=FRTpStats ></p>


</details>`;

	return htm;

};


FRT.openFile = function ( files ) {

	FRT.timeStart = performance.now();

	const reader = new FileReader();
	reader.onload = ( event ) => {

		FRT.files = files;
		FRT.result = reader.result;

		FRT.event = new Event( "onloadfrt", {"bubbles": true, "cancelable": false, detail: true } );

		window.addEventListener( "onloadfrt", FRT.onLoad, false )

		window.dispatchEvent( FRT.event );

	};

	reader.readAsText( files.files[ 0 ] );

};


FRT.onLoad = function () {

	FRTtxtArea.innerHTML = FRT.result;
	const files = FRT.files;

	FRTpStats.innerHTML = `
		name: ${ files.files[ 0 ].name }<br>
		size: ${ files.files[ 0 ].size.toLocaleString() } bytes<br>
		type: ${ files.files[ 0 ].type }<br>
		modified: ${files.files[ 0 ].lastModifiedDate.toLocaleDateString() }<br>
		time to load: ${ ( performance.now() - FRT.timeStart ).toLocaleString() } ms`;

	console.log( '', files.files );
	console.log( '', event );
	
};


FRT.init();