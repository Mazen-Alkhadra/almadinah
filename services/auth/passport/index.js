// Authenticate requests using passport 
const passport = require('passport');
const UserModel = require('../../../models').user;

passport.serializeUser(function (req, user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (req, userId, done) {
	try {
		let user = await UserModel.create().findUser({userId});
		done(null, user);
	} catch(err) {
		done(err, null);
	}
});


require('./local');

module.exports = passport;
