/* globals FOB, FGAdivMenuItems, FGAdivBreadcrumbs */
// jshint esversion: 6
// jshint loopfunc: true


const FGA = {

	script: {

		copyright: "Copyright 2019 pushMe pullYou authors",
		date: "2019-09-08",
		description: "Use GitHub API to obtain a list of files in a GitHub repo. Build menu to access the files",
		helpFile: "https://pushme-pullyou.github.io/tootoo14/js-14-08/fga-files-github-api/README.md",
		license: " MIT License",
		version: "0.14.08-0fga"

	}

};


FGA.branch = '/master/';
FGA.user = 'pushme-pullyou';
FGA.repo = 'tootoo14';
FGA.pathRepo = '';

//FGA.urlGitHubPage = "../../";
FGA.urlGitHubPage = "https://pushme-pullyou.github.io/tootoo14/";

FGA.ignoreFolders = [ "0-templates-readme","archive","data",".github" ];

FGA.urlSourceCode = `https://github.com/${ FGA.user}/${ FGA.repo }/`;

FGA.urlSourceCodeImage = "https://pushme-pullyou.github.io/github-mark-32.png";
FGA.iconInfo = `<img src="${ FGA.urlSourceCodeImage }" height=18 style=opacity:0.5 >`;

FGA.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
FGA.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FGA.regexHtml = /\.(htm?l)$/i;

FGA.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;

const source = ""; //`<a href=${ MNU.urlSourceCode + FGA.script.helpFile } target=_blank >${ MNU.urlSourceCodeIcon } source code</a>`;

FGA.getMenuFilesGithubApi = function() {

	FGA.urlGitHubSource = "https://github.com/" + FGA.user + "/" + FGA.repo;
	FGA.urlGitHubApiContents = 'https://api.github.com/repos/' + FGA.user + "/" + FGA.repo + '/contents/' + FGA.pathRepo;
	FGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	//FOB.xhr.addEventListener( 'load', FGA.onLoadFile, false );
	//FOB.reader.addEventListener( 'load', FGA.onLoadFile, false );
	//document.body.addEventListener( 'onZipFileParse', FGA.onLoadFile, false );

	// <button id=butFGA class=butHelp onclick="POP.setPopupShowHide(butFGA,FGA.script.helpFile,POP.footer,'${ source}');" style=float:right; >?</button>
	const htm =
		`
				<div id = "FGAdivFilesGithubApi" ></div>

				<div id = "FGAdivBreadcrumbs" ></div>

				<br>

				<div id = "FGAdivMenuItems" ></div>
		`;

	return htm;

};



FGA.getFiles = function() {

	//const timeStart = performance.now();

	const url = ""; //!location.hash ? FOB.urlDefaultFile : location.hash.slice( 1 );
	FGA.url = url;

	//const ulc = url.toLowerCase();

	const crumbs = url.slice( FGA.urlGitHubPage.length );

	const pathCurrent = crumbs.lastIndexOf( '/' ) > 0 ? crumbs.slice( 0, crumbs.lastIndexOf( '/' ) ) : '';
	//console.log( 'pathCurrent', pathCurrent );

	if ( FGA.urlGitHubApiContents ){ FGA.setMenuGitHubPathFileNames( pathCurrent ); }

};



FGA.setMenuGitHubPathFileNames = function( path = '' ) {

	//console.log( 'path', path );

	const str = FGA.accessToken ? "?access_token=" + FGA.accessToken : "";

	FGA.urlGitHubApiContents = `https://api.github.com/repos/${ FGA.user }/${ FGA.repo }/contents/${FGA.pathRepo }`;

	const url = FGA.urlGitHubApiContents + path + str;

	FGA.requestFile( url ); // to do: make request only once and triage thereafter

	FGA.setBreadcrumbs( path );

};



FGA.requestFile = function( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = FGA.callbackGitHubPathFileNames;
	xhr.send( null );

};



FGA.callbackGitHubPathFileNames = function( xhr ) {

	const response = xhr.target.response;
	const items = JSON.parse( response );
	//console.log( 'items ', items );

	FGA.menuItems = items;

	//if ( items.message !== "Not Found" ) { alert( items.message ); return; }
	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	const htmFolders = FGA.getFoldersFromContents( items );

	const htmFiles = FGA.getFilesFromContents( items );

	const htmHelp =
	`
		<p>Click any <a href=${ FGA.urlSourceCode } >${ FGA.iconInfo }</a> icon to view source code on GitHub.


		<p>Tooltips provide file size.</p>
		`;

		//<p>Click any &#x2750; icon to go full screen & obtain a link to the individual file.</p>

	FGAdivMenuItems.innerHTML = htmFolders + htmFiles + htmHelp;

};



FGA.getFoldersFromContents = function( items ) {

	let htm = "";

	const len = FGA.pathRepo.length;

	for ( let item of items ) {

		if ( item.type === "dir" && !FGA.ignoreFolders.includes( item.name ) ) {

			// why does this not work? item.path.split( "/" ).pop()
			htm +=
			`
				<div style=margin-bottom:8px;padding:0; >
					<a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ item.path.slice( len ) }"); >
						&#x1f4c1; ${ item.name }
					</a>
				</div>
			`;

		}

	}

	return htm;

};



FGA.getFilesFromContents = function( items ) {

	let htm = "";

	const len = FGA.pathRepo.length;

	const ignoreFiles = [ ".gitattributes", ".gitignore", ".nojekyll", "404.html" ];

	const name = FGA.url.split( "/" ).pop();

	for ( let item of items ) {

		if ( item.type === "file" && !ignoreFiles.includes( item.name ) ) {

			const itemPath = encodeURI( item.path.slice( len ) );

			const str = item.path.endsWith( "html" ) ? `<a href="${ FGA.urlGitHubPage }${ FGA.pathRepo }${ itemPath }" title="Open file in new tab" >&#x2750;</a>` : "";

			const stl = item.name === name ? "yellow" : "";

			htm += // try grid or flexbox??
			`
				<table id=${ item.name } style=background-color:${ stl }; ><tr>
					<td>
						<a href="${ FGA.urlGitHubSource }/blob${ FGA.branch }${ itemPath }" target=_top title="View or edit source code" >
							${ FGA.iconInfo }
						</a>
					</td>
					<td>
						<a href=${ location.href.replace( location.hash, "" ) }#${ FGA.urlGitHubPage }${ FGA.pathRepo }${ itemPath } title="${ item.size.toLocaleString() } bytes" >
							${ item.name }
						</a>
						${ str }
					</td>
				</tr></table>
			`;

			// how to simplify
/* 			if ( ( !location.hash || location.hash.toLowerCase().endsWith( 'readme.md' ) )

				&& ( item.name.toLowerCase() === 'readme.md' ) ) {

				//location.hash = FGA.urlGitHubPage + FGA.pathRepo + itemPath;

			} */

		}

	}

	return htm;

};



FGA.onLoadFile = function() {

	const tables = FGAdivMenuItems.querySelectorAll( "table" );

	tables.forEach( table => table.style.backgroundColor = table.id === FOH.fileName ? "yellow" : "" );

};



FGA.setBreadcrumbs = function( path ) {
	//console.log( 'path', path );

	const folders = path ? path.split( '/' ) : [] ;

	let htmFolders = "";
	let str = "";

	for ( let folder of folders ) {

		str += `${ folder }/`;

		htmFolders += `<b><a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ str.slice( 0, -1 ) }"); >${ folder }</a> &raquo; </b>`;

	}

	FGAdivBreadcrumbs.innerHTML =
	`<div>
		<b>
			<a href=JavaScript:FGA.setMenuGitHubPathFileNames(); title="home folder" >
				${ ( FGA.pathRepo ? FGA.pathRepo : "<span style=font-size:28px >&#x2302</span>" ) }
			</a> &raquo;
		</b>
		${ htmFolders }
	</div>`;

};
