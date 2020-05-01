const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

async function initialize(passport, getUserByUsername) {
	const authenticateUser = (username, password, done) => {
		const user = getUserByUsername(username);
		if (user == null) {
			return done(null,false, {message:"No user found"});
		}
		try {
			if (await bcrypt.compare(password, user.password))
			{
				return done(null,user)
			}
			else {
				return done(null, false,{message:"Password Incorrect"})
			}
		}
		catch(e){
			return done(e)
		}
	};
	passport.use(
		new LocalStrategy({ usernameField: "username" }, authenticateUser)
	);
	passport.serializeUser((user, done) => {});
	passport.deserializeUser((id, done) => {});
}
modules.exports = initialize
