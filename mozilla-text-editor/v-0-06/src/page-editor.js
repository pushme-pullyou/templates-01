// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
// https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Midas

const pathApi = "https://api.github.com/repos/theo-armour/theo-armour.github.io/contents/data/days-of-year-md/";

let logFileContent;
let logFileSha;
let decodedData;
let htmPrevious = "";

var oDoc, sDefTxt;

function initDoc() {

	oDoc = document.getElementById("textBox");
	sDefTxt = oDoc.innerHTML;
	if (switchBox.checked) {
		setDocMode(true);
	}

	window.addEventListener("hashchange", onHashChange, false);

	tt = setInterval(() => {

		console.log('', 23);

		if ( textBox.innerHTML !== htmPrevious) {
			console.log('text change');

			putHtmlFile();

		}

		htmPrevious = textBox.innerHTML

	}, 30000);
}

function onHashChange() {

	url = location.hash.slice(1);

	if (url.toLowerCase().endsWith(".md") === false) { return; }

	getHtmlFile(url);

}


function getHtmlFile(url) {

	fetch(new Request( pathApi + url))
		.then(response => response.json())
		.then( data => {

			//console.log( "data", data );

			decodedData = window.atob(data.content);

			textBox.innerHTML = decodedData;

			htmPrevious = textBox.innerHTML;
			
			logFileSha = data.sha;

		}).catch((err) => {

			console.warn('Something went wrong.', err);

		});

}



function putHtmlFile() {

	url = location.hash.slice(1);
	//const url = "https://api.github.com/repos/theo-armour/theo-armour.github.io/contents/first-post.jsonl";

	const request = new Request(pathApi + url );

	content = textBox.innerHTML;

	//divToSend.innerHTML = content;

	codedData = window.btoa(content); // encode the string

	fetch(request, {
		method: "PUT",
		headers: { "Authorization": "token " + FGA.accessToken, "Content-Type": "text/plain" },
		body: JSON.stringify({
			"branch": "master",
			"committer": {
				"name": "Theo Armour",
				"email": "t.armour@gmail.com"
			},
			"content": codedData,
			"message": "add to file",
			"sha": logFileSha
		}),

	})
		.then(response => response.json())
		.then(data => {

			d = data
			console.log('data', data);

			if (data.message) {

				htm = data.message;

			} else {

				htm = `<p>name:${ data.content.name } time:${ data.commit.author.date } size:${ data.content.size }</p>`

			}

			divResponsePost.innerHTML = htm;

		})
		.catch(err => console.warn('Something went wrong.', err));

}




function formatDoc(sCmd, sValue) {
	if (validateMode()) {
		document.execCommand(sCmd, false, sValue);
		oDoc.focus();
	}
}

function validateMode() {
	if (!switchBox.checked) {
		return true;
	}
	alert('Uncheck "Show HTML".');
	oDoc.focus();
	return false;
}

function setDocMode(bToSource) {
	var oContent;
	if (bToSource) {
		oContent = document.createTextNode(oDoc.innerHTML);
		oDoc.innerHTML = "";
		var oPre = document.createElement("pre");
		oDoc.contentEditable = false;
		oPre.id = "sourceText";
		oPre.contentEditable = true;
		oPre.appendChild(oContent);
		oDoc.appendChild(oPre);
	} else {
		if (document.all) {
			oDoc.innerHTML = oDoc.innerText;
		} else {
			oContent = document.createRange();
			oContent.selectNodeContents(oDoc.firstChild);
			oDoc.innerHTML = oContent.toString();
		}
		oDoc.contentEditable = true;
	}
	oDoc.focus();
}

function printDoc() {
	if (!validateMode()) {
		return;
	}
	var oPrntWin = window.open(
		"",
		"_blank",
		"width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes"
	);
	oPrntWin.document.open();
	oPrntWin.document.write(
		'<!doctype html><html><head><title>Print<\/title><\/head><body onload="print();">' +
		oDoc.innerHTML +
		"<\/body><\/html>"
	);
	oPrntWin.document.close();
}

function openFile(files) {
	var fileData, reader, data;

	reader = new FileReader();
	reader.onload = function (event) {
		textBox.innerHTML = reader.result;

		menuOpenFile.innerHTML =
			"name: " +
			files.files[0].name +
			"<br>" +
			"size: " +
			files.files[0].size.toLocaleString() +
			" bytes<br>" +
			"type: " +
			files.files[0].type +
			"<br>" +
			"modified: " +
			files.files[0].lastModifiedDate.toLocaleDateString() +
			"";

		//	console.log( '', files );
	};

	reader.readAsText(files.files[0]);
}

function saveFile() {

	const blob = new Blob([textBox.innerHTML]);
	let a = document.body.appendChild(document.createElement("a"));
	a.href = window.URL.createObjectURL(blob);
	a.download = "hello-world.html";
	a.click();
	a = null;

}
