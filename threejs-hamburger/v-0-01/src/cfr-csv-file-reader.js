
const CFR = {};

CFR.getMenu = function () {

	const htm =
		`
<details open >

	<summary>File open CSV file</summary>

	<p>Open a CSV file using the file dialog box</p>

	<p><input type=file id=inpFile onchange=CFR.openFile(this); accept = '.csv' ></p>

	<div id=CFRdivMessage ></div>

</details>
	`;

	return htm;

};



CFR.openFile = function (files) {

	const reader = new FileReader();

	reader.onload = function (event) {

		//txtArea.innerHTML = reader.result;

		window.dispatchEvent(eventResetAll);

		CFRdivMessage.innerHTML =
		`
			<p>
				name: ${ files.files[0].name}<br>
				size: ${ files.files[0].size.toLocaleString() } bytes<br>
				type: ${ files.files[0].type }<br>
			modified: ${ files.files[0].lastModifiedDate.toLocaleDateString() }
			</p>
		`;

		CFR.getLines( reader.result );

	}

	reader.readAsText(files.files[0]);

};





CFR.getLines = function( csv ) {

	const lines = csv.split( /\n/g ).map( line => line.split( ',' ).map( item => parseFloat( item ) ) ).slice( 1 );
	console.log('lines', lines);



}
