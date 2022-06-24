// Authenticate requests using passport 
const passport = require('passport');
const UserModel = require('../../../models').User;

passport.serializeUser(function (req, user, done) {
	done(null, user.id);
});

passport.deserializeUser(async function (req, userId, done) {
	try {
    let userModel = new UserModel();
		let user = await userModel.findUser({userId});
		done(null, user);
	} catch(err) {
		done(err, null);
	}
});


require('./local');

module.exports = passport;
