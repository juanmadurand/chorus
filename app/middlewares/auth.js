var User = require('../models/user')

exports.login = function(req, res, next) {
	if (req.session.user){
		return res.redirect('/');
	}

	var username = req.body.username;
	var pass = req.body.password;

	User.findOne({username: username}, function (err, user) {
		if (err || !user){
			return next(err);
		}

		user.comparePassword(pass, function(err, isLogged){
			if (err){
				return next(err);
			}
			if (isLogged) {
				req.session.user = {id: user.id, username: user.username};
				res.redirect('/');
			} else {
				res.redirect('/login');
			}
		});
	});
}

exports.logout = function(req, res, next) {
	delete req.session.user;
	res.redirect('/login');
}

// Authorize a given page only to registered users
exports.requireAuth = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}
