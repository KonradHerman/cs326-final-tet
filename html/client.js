const url = "https://tet326.herokuapp.com/counter"; // NOTE NEW URL

function gameCreate() {
	(async () => {
		//when creating a game, input id is "gamename"
		let gameName = document.getElementById("gameCreate").value;
		console.log(gameName);
		const data = { name: gameName };
		const newURL = url + "/games/create"; // used to be ?name=" + counterName; -- (2)
		console.log("gameCreate: fetching " + newURL);
		const resp = await postData(newURL, data); // used to be fetch -- (3)
		const j = await resp.json();
		if (j["result"] !== "error") {
			//success
			let out = gameName + "created";
			document.getElementById("gameCreate-output").innerHTML +=
				'<p class="text-primary">' + j.name + "</p><br>";
			console.log(out);
		} else {
			//error
			let out = gameName + "not created";
			document.getElementById("gameCreate-output").innerHTML =
				"200: " + "gameName" + ", " + " not found.</b>";
			console.log(out);
		}
	})();
}

function gameReadAll() {
	(async () => {
		const newURL = url + "/games/readall";
		console.log("gameReadAll: fetching " + newURL);
		const resp = await postData(newURL);
		console.log(resp);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			for (const element of j["games"]) {
				document.getElementById("selectGame").innerHTML += // (1) changed id output to dropdown-output
					'<option id="' + element.name + '">' + element.name + "</option>";
			}
		} else {
			console.log("failure to read all");
		}
	})();
}

function userRead() {
	(async () => {
		//This needs to be changed if we get auth working.
		let userName = "konrad";
		// ^^^^^^^
		const newURL = url + "/users/read";
		const data = { name: userName };
		console.log("userRead: fetching " + newURL);
		const resp = await postData(newURL, data);
		console.log(resp);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			for (const element of j["games"]) {
				// document.getElementById("selectGame").innerHTML += // (1) changed id output to dropdown-output
			}
		} else {
			console.log("failure to read all");
		}
	})();
}

function gameRead() {
	(async () => {
		//we need to change this element id based on the html page
		// let gameName = document.getElementById("selected").value;
		let drop = document.getElementById("selectGame");
		let gameName = drop.options[drop.selectedIndex].id;
		const newURL = url + "/games/read";
		const data = { name: gameName };
		console.log("gameRead: fetching " + gameName);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(j.game);
		console.log(JSON.parse(j.game));
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
		let drop = document.getElementById("selectGame");
		let gameName = drop.options[drop.selectedIndex].id;
		console.log(gameName);
		let userName = document.getElementById("userid").value;
		let own = document.getElementById("own").checked;
		let add = document.getElementById("add").checked;
		const newURL = url + "/games/update";
		const data = { game: gameName, user: userName, own: own, add: add };
		console.log("gameUpdate: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			// document.getElementById("final").innerHTML +=
			// 	" <p>game updated succesfully</p>";
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

function userCreate() {
	(async () => {
		let userName = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password1 = document.getElementById("password1").value;
		let password2 = document.getElementById("password2").value;
		let zip = "01002";
		let img = "no img";
		const data = {
			name: userName,
			email: email,
			password: password1,
			img: img,
			zip: zip,
		};
		const newURL = url + "/users/create";
		console.log("logging in: fetching");
		console.log(newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j["result"] !== "error") {
			//Success
			let out = userName + " created";
			console.log(out);
		} else {
			let out = userName + " could not be created, an error has occured";
			console.log(out);
		}
	})();
}

function passwordMatcher() {
	let password1 = document.getElementById("password1").value;
	let password2 = document.getElementById("password2").value;
	if (password1 === password2) {
		document.getElementById("password-match-output").innerHTML +=
			'<p class="text-primary" style= "color: red;">Passwords do not match</p><br>';
		return false;
	}
	return true;
}

function userLogin() {
	(async () => {
		let userName = document.getElementById("username").value;
		// let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		const data = { name: userName, password: password };
		const newURL = url + "/users/login";
		console.log("logging in: fetching");
		console.log(newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(j);
		document.getElementById("login-output").innerHTML =
			"your username or password is incorrect<br>please try again";
		if (j["result"] !== "caught error") {
			if (j["result"] === "Incorrect Password") {
				let out = "Incorrect Password ";
				console.log(out);
			} else if (j["result"] === "user not found") {
				let out = "Username is incorrect";
				console.log(out);
			} else {
				// Success
				document.getElementById("login-output").innerHTML = "Signing you in!";
				document.getElementById("login-output").style.color = "green";
				let out = userName + " logged in";
				window.location.href = j["url"];
				console.log(out);
			}
		} else {
			let out = userName + " was unable to login";
			console.log(out);
		}
	})();
}

function userDelete() {
	(async () => {
		//let userID = document.getElementById("userID").value;
		let userID = 59392;
		const newURL = url + "/users/delete";
		const data = { id: userID };
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
function usersSearch() {
	(async () => {
		//let userID = document.getElementById("userID").value;
		let drop = document.getElementById("selectGame");
		let gameName = drop.options[drop.selectedIndex].id;
		let newURL = url + "/games/read";
		let data = { name: gameName };
		console.log("gameRead: fetching " + gameName);
		let resp = await postData(newURL, data);
		console.log(resp);
		let j = await resp.json();
		let game = JSON.parse(j.game);

		j = await resp.json();
		const getEmails = async () => {
			let str = [];
			for (const i of game.own) {
				str.push(i);
			}
			newURL = url + "/users/read/emails";
			data = { names: str };
			console.log("emailRead: fetching ");
			resp = await postData(newURL, data);
			j = await resp.json();
			emailArray = JSON.parse(j.users);
			let ans = "";
			for (let i = 0; i < emailArray.length; ++i) {
				ans += str[i] + " " + emailArray[i].email;
			}
			return ans;
		};
		if (j["result"] !== "error") {
			document.getElementById("searchuseroutput").innerHTML =
				'<a href="#" class="list-group-item flex-column align-items-start primary"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
				game.name +
				'</h5><small>Editor\'s Choice</small></div><p class="mb-1">' +
				(await getEmails()) +
				"</a>";
		} else {
			console.log("failure to read all");
		}
	})();
}