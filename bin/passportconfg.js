// Authenticate requests using passport 
const localStrategy = require('passport-local');
const dbConnect = require('../database/connect');
const mojammaa = require('./mojammaa');

module.exports = function (passport) {
	passport.cachUsers = {};

	passport.use('logIn',
		new localStrategy({
			usernameField: 'email',
			passwordField: 'password',
		},
			function (username, password, done) {
				var queryString = 
					'SELECT * FROM users WHERE PersonalEmail = ? AND Deleted = FALSE;';
				dbConnect.query(queryString, [username], function (err, usersRows) {

					if (err) {
						mojammaa.log(
							`Error in Execution SQL Query: ${this.sql} \n` + err.message,
							mojammaa.logLevels.DB_ERR,
							__filename,
							`dbConnect.query(${this.sql}) callback`,
							null, err
						);
						return done(err);
					}

					var user;
					if (usersRows)
						user = usersRows[0];

					if (!user) {
						return done(null, false, { message: 'Invalid Email' });
					}

					if (user.Password !== password) {
						return done(null, false, { message: 'Invalid password' });
					}

					if (!user.Active) {
						return done(null, false, {
							message: 'The account is not activated yet, please\
							 active your account by clicking on the activation link sent to your email.'});
					}

					return done(null, user, { message: 'Success' });

				});
			})
	);

	passport.serializeUser(function (req, user, done) {
		console.log('serializeUser ', user);
		var keys = Object.keys(passport.cachUsers);
		if (keys.length > 500) {
			delete passport.cachUsers[keys[0]];
		}
		console.log('%%%%%%%%%% ', user);
		passport.cachUsers[user.IdUser] = user;
		done(null, user.IdUser);
	});

	passport.deserializeUser(function (req, id, done) {
		if (passport.cachUsers[id]) {
			return done(null, passport.cachUsers[id]);
		}
		var queryString =
		 'SELECT * FROM users WHERE IdUser = ? AND Deleted = FALSE;';
		
		dbConnect.query(queryString, [id], function (err, usersRows) {
			if (err) {
				mojammaa.log(
					`Error in Execution SQL Query: ${this.sql}\n` + err.message,
					mojammaa.logLevels.DB_ERR,
					__filename,
					`passport.deserializeUser`,
					null, err
				);
			}

			if (usersRows) {
				passport.cachUsers[id] = usersRows[0];
			}

			console.log('&&&&&&&&&& ', err);
			return done(err, passport.cachUsers[id]);
		});
	});

	passport.chekAuthority = function (req, res) {
		if (!req.isAuthenticated()) {
			res.status(401);
			res.end('You are not logged in / Registered');
			return false;
		}
		return true;
	};

	passport.checkAdminRole = function (req, res, next) {
		if (!req.isAuthenticated()) {
			console.log('======== !req.isAuthenticated()');
			if(res)
				res.status(401).end('You are not logged in / Registered');
			return false;
		}
		
		if(!passport.isAdmin(req.user)) {
			console.log('************* !this.isAdmin()');
			if(res)
				res.status(401).end('Not Authorized');
			return false;
		}

		if(next)
			next(req, res);
			
		return true;
	};

	passport.isAdmin = function(user) {
		return user.Role === 2;
	}

}
