const url = "http://localhost:8080/counter"; // NOTE NEW URL

function userCreate() {
	(async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		// NEW: we no longer add info to the URL (for GET) but instead put it in a JSON object.
		const data = { name: counterName }; // -- (1)
		const newURL = url + "/users/" + userName + "/create"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			document.getElementById("output").innerHTML =
				"101: <b>" + userName + ", " + counterName + " created.</b>";
		} else {
			document.getElementById("output").innerHTML =
				"100: " + userName + ", " + counterName + " not found.</b>";
		}
	})();
}

function counterRead() {
	(async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		const data = { name: counterName }; // -- (1)
		const newURL = url + "/users/" + userName + "/read"; // used to be ?name=" + counterName; -- (2)
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			document.getElementById("output").innerHTML =
				"201: <b>" +
				userName +
				", " +
				counterName +
				" value = " +
				j["value"] +
				"</b>";
		} else {
			document.getElementById("output").innerHTML =
				"200: " + userName + ", " + counterName + " not found.</b>";
		}
	})();
}

function counterUpdate() {
	(async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		let counterValue = document.getElementById("countervalue").value;
		const data = {
			name: counterName,
			value: counterValue,
		};
		const newURL = url + "/users/" + userName + "/update"; // used to be ?name=" + counterName; -- (2)
		console.log("counterUpdate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			document.getElementById("output").innerHTML =
				"301: <b>" +
				userName +
				", " +
				counterName +
				" value = " +
				j["value"] +
				"</b>";
		} else {
			document.getElementById("output").innerHTML =
				"300: " + userName + ", " + counterName + " not found.";
		}
	})();
}

function counterDelete() {
	(async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		const newURL = url + "/users/" + userName + "/delete"; // used to be ?name=" + counterName; -- (2)
		const data = {
			name: userName,
		};
		console.log("counterDelete: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			document.getElementById("output").innerHTML =
				"401: <b>" + userName + ", " + counterName + " deleted.</b>";
		} else {
			document.getElementById("output").innerHTML =
				"400: " + userName + ", " + counterName + " not found.</b>";
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
