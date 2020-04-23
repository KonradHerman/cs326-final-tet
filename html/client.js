const url = "http://localhost:8081/counter"; // NOTE NEW URL

function gameCreate() {
	(async () => {
		//when creating a game, input id is "gamename"
		let gameName = document.getElementById("gamename").value;
		const data = { name: gameName };
		const newURL = url + "/games/create"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			//success
			document.getElementById("output").innerHTML =
				"101: <b>" + userName + ", " + counterName + " created.</b>";
		} else {
			//error
			document.getElementById("output").innerHTML =
				"100: " + userName + ", " + counterName + " not found.</b>";
		}
	})();
}

function gameReadAll() {
	(async () => {
		//let counterName = document.getElementById("countername").value;
		//let userName = document.getElementById("username").value;
		//const data = { name: counterName }; // -- (1)
		const newURL = url + "/games/read"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			for (const element of j["value"]) {
				document.getElementById("output").innerHTML +=
					'<a class="dropdown-item" href="#">'+ element.name + '</a>';
			}
		} else {
			document.getElementById("output").innerHTML =
				"200: " + userName + ", " + counterName + " not found.</b>";
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
