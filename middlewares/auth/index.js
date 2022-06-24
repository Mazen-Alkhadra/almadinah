let Auth = require('../../services/auth').type;

function requireLogin () {
	return (req, res, next) => {
		if (req.isAuthenticated() && next)
				next();
		else 
			res.status(401).end();
	}
}


module.exports = {
	init: Auth.getInitAuthMiddleware(),
	requireLogin
};