// copyright 2020 Theo Armour. MIT licene

aSource.href = "https://github.com/zzzzz/xxxxx.html";
imgIcon.src = "https://pushme-pullyou.github.io/github-mark-32.png";
sTitle.innerHTML= document.title ? document.title : location.href.split( '/' ).pop().slice( 0, - 5 ).replace( /-/g, ' ' );
const version = document.head.querySelector( "[ name=version ]" );
sVersion.innerHTML = version ? version.content : "";
divDescription.innerHTML = document.head.querySelector( "[ name=description ]" ).content;


init();


function init() {

	hdrMainTitle.innerHTML = "<h1>Title</h1>"

	divMenu.innerHTML += divContent.innerHTML += `${( new Date )}<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>`;

	if ( window.innerWidth < 640 || window.innerHeight < 640 ) { toggleNavMenu(); }

}



function setIt() {

	mainContents.innerHTML += `<p>${( performance.now() )} - Howdy! </p>`;

}


function toggleNavMenu() {

	expandButton.classList.toggle( 'collapsed' );
	navMenu.classList.toggle( 'collapsed' );
	divMain.classList.toggle( 'collapsed' );

}