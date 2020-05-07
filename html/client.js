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
		let userName = sessionStorage.getItem("username");
		const newURL = url + "/users/read";
		const data = { name: userName };
		console.log("userRead: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		console.log(JSON.stringify(j));
		if (j["result"] !== "error") {
			let own = document.getElementById("ownGames").innerHTML;
			//let want = document.getElementById("wantGames").innerHTML;
			for (const element of j.user.own) {
				console.log(element);
				own += "<tr>\n<td>" + element + "</td>\n</tr>";
				// document.getElEmentById("selectGame").innerHTML += // (1) changed id output to dropdown-output
			}
		} else {
			console.log("failure to read all");
		}
	})();
}

function gameRead() {
	(async () => {
		//we need to change this element id based on the html page
		let drop = document.getElementById("selectGame");
		let gameName = drop.options[drop.selectedIndex].id;
		const newURL = url + "/games/read";
		const data = { name: gameName };
		console.log("gameRead: fetching " + gameName);
		const resp = await postData(newURL, data);
		console.log(resp);
		const j = await resp.json();
		console.log(j.game);
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
		let userName = sessionStorage.getItem("username");
		console.log(userName);
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
		let sessionId = "-1";
		const data = {
			name: userName,
			email: email,
			password: password1,
			img: img,
			zip: zip,
			sessionId: sessionId,
		};
		const newURL = url + "/users/create";
		console.log("logging in: fetching");
		console.log(newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j["result"] !== "error") {
			if (j["result"] === "username in use") {
				let out = "username already in use";
				console.log(out);
				document.getElementById("badUsername").innerHTML =
					"THE USERNAME YOU ENTERED HAS ALREADY BEEN TAKEN";
				document.getElementById("badUsername").style.color = "red";
			} else if (j["result"] === "email in use") {
				let out = "email already in use";
				console.log(out);
				document.getElementById("badUsername").innerHTML =
					"username available!";
				document.getElementById("badUsername").style.color = "green";
				document.getElementById("badEmail").innerHTML =
					"THE EMAIL YOU ENTERED IS ALREADY IN USE";
				document.getElementById("badEmail").style.color = "red";
			} else {
				//Success
				let out = userName + " created";
				console.log(out);
				window.location.href = "https://tet326.herokuapp.com";
			}
		} else {
			let out = userName + " could not be created, an error has occured";
			console.log(out);
		}
	})();
}

function passwordMatcher() {
	let password1 = document.getElementById("password1").value;
	let password2 = document.getElementById("password2").value;
	if (password1 !== password2) {
		document.getElementById("password-match-output").innerHTML =
			"PASSWORDS DO NOT MATCH";
		document.getElementById("password-match-output").style.color = "red";
		return false;
	} else {
		document.getElementById("password-match-output").innerHTML =
			"passwords match!";
		document.getElementById("password-match-output").style.color = "green";
		return true;
	}
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
				sessionStorage.setItem("username", j["username"]);
				sessionStorage.setItem("sessionId", j.sessionId);
				console.log(j.sessionId);
				window.location.href = "https://tet326.herokuapp.com/home.html";
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
		//we need to change this element id based on the html page
		let drop = document.getElementById("selectGame");
		let gameName = drop.options[drop.selectedIndex].id;
		let newURL = url + "/games/read";
		let data = { name: gameName };
		console.log("gameRead: fetching " + gameName);
		const resp = await postData(newURL, data);
		const j = await resp.json();

		newURL = url + "/users/readsome";
		let names = j.game.own;
		data = { names: names };
		console.log("read some users: fetching " + names);
		const respOwn = await postData(newURL, data);
		const owners = await respOwn.json();
		console.log(owners.users);

		newURL = url + "/users/readsome";
		names = j.game.own;
		data = { names: names };
		console.log("read some users: fetching " + names);
		const respWant = await postData(newURL, data);
		const wanters = await respWant.json();
		console.log(wanters.users);

		if (j["result"] !== "error") {
			document.getElementById(
				"searchuseroutput"
			).innerHTML = document.getElementById("searchuseroutput").innerHTML =
				'<div class="primary"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
				j.game.name +
				'</h5></div><ul class="list-group col" id="owners"><ul class="list-group col" id="wanters"></div>';
			for (let i of owners.users) {
				document.getElementById("owners").innerHTML +=
					' <li class="list-group-item">' + i.name + " " + i.email + "</li>";
			}
			for (let i of wanters.users) {
				document.getElementById("wanters").innerHTML +=
					' <li class="list-group-item">' + i.name + " " + i.email + "</li>";
			}
		} else {
			console.log("failure to read all");
		}
	})();
}

function checkSession() {
	(async () => {
		let username = sessionStorage.getItem("username"); // this is already public
		let sessionId = sessionStorage.getItem("sessionId");
		if (sessionId === null) {
			document.body.innerHTML = "<h1>Your Session has Expired</h1>";
			window.setTimeout(function () {
				window.location.href = "https://tet326.herokuapp.com";
			}, 3000);
		} else {
			const newURL = url + "/users/session";
			const data = { username: username, sessionId: sessionId };
			const resp = await postData(newURL, data);
			console.log(resp);
			const j = await resp.json();
			if (j["result"] !== "error") {
				if (j["result"] === "user not found") {
					console.log("session user not found");
				} else if (j["result" === "session invalid"]) {
					document.body.innerHTML = "<h1>Your Session is invalid</h1>";
					window.setTimeout(function () {
						window.location.href = "https://tet326.herokuapp.com";
					}, 3000);
				} else if (j["result" === "user not logged in"]) {
					document.body.innerHTML = "<h1>Your Session is invalid</h1>";
					window.setTimeout(function () {
						window.location.href = "https://tet326.herokuapp.com";
					}, 3000);
				} else {
					console.log("session good");
				}
			} else {
				console.log("session error has occurred");
				window.setTimeout(function () {
					window.location.href = "https://tet326.herokuapp.com";
				}, 3000);
			}
		}
	})();
}

function fillUser() {
	document.getElementById("username-output").innerHTML = sessionStorage.getItem(
		"username"
	);
}
