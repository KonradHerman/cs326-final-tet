const url = "http://localhost:8081/counter"; // NOTE NEW URL

function gameCreate() {
	(async () => {
		//when creating a game, input id is "gamename"
		let gameName = document.getElementById("gamename").value;
		const data = { name: gameName };
		const newURL = url + "/games/create"; // used to be ?name=" + counterName; -- (2)
		console.log("gameCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			//success
			let out = gameName + "created";
			console.log(out);
		} else {
			//error
			let out = gameName + "not created";
			console.log(out);
		}
	})();
}

function gameReadAll() {
	(async () => {
		const newURL = url + "/games/readall";
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			for (const element of j["games"]) {
				document.getElementById("output").innerHTML +=
					'<a class="dropdown-item" id="' +
					element.id +
					'" href="#">' +
					element.name +
					"</a>";
			}
		} else {
			document.getElementById("output").innerHTML =
				"200: " + "hi" + ", " + " not found.</b>";
		}
	})();
}

function gameRead() {
	(async () => {
		//we need to change this element id based on the html page
		let gameName = document.getElementById("selected").value;
		const newURL = url + "/games/read";
		const data = { name: gameName };
		console.log("gameRead: fetching " + gameName);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			console.log("game read successfully");
			// for (const element of j["games"]) {
			// 	document.getElementById("output").innerHTML +=
			// 		'<a class="dropdown-item" href="#">' + element.name + "</a>";
			// }
		} else {
			console.log("failure reading");
			// document.getElementById("output").innerHTML =
			// 	"200: " + "hi" + ", " + " not found.</b>";
		}
	})();
}

function gameUpdate() {
	(async () => {
		//we need to change this element id based on the html page
		let gameID = document.getElementById("gameid").value;
		let userID = document.getElementById("userid").value;
		let own = document.document.getElementById("own").checked;
		let add = document.getElementById("add").checked;
		console.log(typeof own);
		console.log(typeof add);
		const newURL = url + "/games/update";
		const data = { game: gameID, user: userID, own: own, add: add };
		console.log("gameUpdate: fetching " + gameName);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			console.log("game updated successfully");
			// for (const element of j["games"]) {
			// 	document.getElementById("output").innerHTML +=
			// 		'<a class="dropdown-item" href="#">' + element.name + "</a>";
			// }
		} else {
			console.log("failure updating");
			// document.getElementById("output").innerHTML =
			// 	"200: " + "hi" + ", " + " not found.</b>";
		}
	})();
}
function userDelete() {
	(async () => {
		let userID = document.getElementById("userID").value;
		const newURL = url + "/users/delete";
		const data = { id: userID};
		console.log("gameUpdate: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j["result"] !== "error") {
			console.log("User deleted.");
		} else {
			console.log("error could not delete.");
		}
	})();
}
// NEW: helper method for posting data
async function postData(url, data) {
	const resp = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		body: JSON.stringify(data),
	});
	return resp;
}
