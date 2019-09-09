/* globals JSZip, showdown, divContents, FOBdivFileOpenBasic, FOBinpFilePath, FILdivProgress */
// jshint esversion: 6
/* jshint loopfunc: true */

var FOH = {

	"copyright": "Copyright 2019 pushMe pullYou authors",
	"date": "2019-09-06",
	"helpFile": "https://pushme-pullyou.github.io/tootoo14/js-14-08/FOH-file-open-basic/README.md",
	"license": "MIT License",
	"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/blob/master/js-14-08/FOH-file-open-basic/FOH-file-open-basic.js",
	"version": "0.00.00-1foh"
};

FOH.urlDefaultFile = "README.md";

FOH.description =
	`
		TooToo File Open Basic (FOH) provides HTML and JavaScript to
		select, open and display local files using the file dialog box, drag and drop or URL.
	`;

FOH.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules

FOH.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOH.regexHtml = /\.(htm?l)$/i;

FOH.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;

FOH.onHashChange = function() {
	//console.log( 'FOH.urlDefaultFile', FOH.urlDefaultFile );
	//console.log( 'location.hash', location.hash );

	const url = !location.hash ? FOH.urlDefaultFile : location.hash.slice( 1 );

	FOH.requestFileDecider( url );

};



FOH.requestFileDecider = function( url ) { // from a button
	//console.log( 'url', url );

	if ( !url ) { return; }

	FOH.fileName = url.split( '/').pop();

	if ( FOH.regexHtml.test( url ) ) {

		FOH.target.innerHTML = `<iframe src=${ url } style="${ FOH.contentsCss }" ></iframe>`;

	} else if ( FOH.regexImages.test( url )  ) {

		FOH.target.innerHTML = `<img src=${ url } >`;

	} else if ( FOH.fileName.toLowerCase().endsWith( '.zip' )) {

		FOH.xhrRequestFileZip( url, FOH.callbackUrlUtf16 );

	} else { // let

		//FOH.xhr.addEventListener( 'load', FOH.callbackDecider, false );

		FOH.requestFileText( url );

	}

};



FOH.requestFileText = function( url ) {

	if ( !url ) { return; }

	FOH.timeStart = performance.now();

	FOH.xhr.open( 'GET', url, true );
	FOH.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOH.xhr.onprogress = function( xhr ) { FOH.onProgress( xhr.loaded, FOH.note ); };
	FOH.xhr.onload = function( xhr ) { FOH.onProgress( xhr.loaded ); FOH.callbackDecider( xhr ); };
	FOH.xhr.send( null );

};



FOH.onProgress = function( size = 0, note = '' ) {

	const timeToLoad = ( performance.now() - FOH.timeStart ).toLocaleString();

	FOH.fileInfo =
	`
		<div>
			<div><span class=attributeTitle >Name: <span class=attributeValue >${ FOH.fileName }</span></div>
			<div><span class=attributeTitle >Bytes loaded: </span>: <span class=attributeValue >${ size.toLocaleString() }</span></div>
			<div><span class=attributeTitle >Time to load: </span>: <span class=attributeValue>${ timeToLoad } ms</span></div>
			${ note }
		</div>
	`;

	if ( FOH.divMessages ) { FOBdivInfo.innerHTML = FOH.fileInfo; }

};



//////////

FOH.callbackDecider = function ( xhr ) {
	//console.log( 'xhr', xhr );

	FOH.text = xhr.target.response;

	const ulc = xhr.target.responseURL.toLowerCase();

	if ( ulc.endsWith( '.md' ) ) {

		FOH.setTargetWithMarkdownAsHtml( xhr.target.response );

	} else if ( ulc.endsWith( '.json' ) ) {

		FOH.callbackJson( xhr.target.response );

	} else if ( ulc.endsWith( '.xml' ) ) {

		FOH.callbackXml( xhr.target.response );

	} else {

		FOH.callbackOtherToTextarea( xhr.target.response );

	}

};



FOH.callbackXml = function( text ) {

	FOH.onProgress( text.length, "load complete" );

	FOH.text = text;

	const eventLoad = new Event( 'FOBonXmlFileLoad' );
	//document.body.addEventListener( 'FOBonXmlFileLoad', () => { console.log( '', 23 ) }, false );

	document.body.dispatchEvent( eventLoad );


};



FOH.callbackJson = function( text ) {

	//const data = obj.target ? obj.target.response : obj;

	//FOH.target.innerHTML = html;
	//window.scrollTo( 0, 0 );

	FOH.onProgress( text.length, "load complete" );

	FOH.text = text;

	const eventLoad = new Event( 'FOBonJsonFileLoad' );

	// document.body.addEventListener( 'FOBonJsonFileLoad', () => {
	// 	console.log( 'loaded', FOH.fileName )
	// 	FOH.target.innerHTML = `<div style="${ FOH.contentsCss }" >${ text }</div>`;
	// }, false );

	document.body.dispatchEvent( eventLoad );

};



FOH.callbackOtherToTextarea = function( text ){

	FOH.target.innerHTML = `<textarea style="${ FOH.contentsCss }" >${ text }</textarea>`;

};



FOH.setTargetWithMarkdownAsHtml = function( markdown ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	FOH.target.innerHTML = html;
	window.scrollTo( 0, 0 );

};