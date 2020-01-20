
aSource.href = "https://github.com/pushme-pullyou/templates-01/tree/master//threejs-hamburger";
imgIcon.src = "assets/github-mark-32.png";
sTitle.innerHTML = document.title ? document.title : location.href.split( '/' ).pop().slice( 0, - 5 ).replace( /-/g, ' ' );
const version = document.head.querySelector( "[ name=version ]" );
sVersion.innerHTML = version ? version.content : "";
divDescription.innerHTML = document.head.querySelector( "[ name=description ]" ).content;

THR.init();
THR.animate();


init();


function init() {

	if ( window.innerWidth < 640 || window.innerHeight < 640 ) {
		toggleNavMenu();
	}

}

function toggleNavMenu() {

	expandButton.classList.toggle( 'collapsed' );
	navMenu.classList.toggle( 'collapsed' );
	divContent.classList.toggle( 'collapsed' );

}
