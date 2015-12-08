module.exports = function(context) {

	var express = require('express'),
	router = express.Router();

	var User = require('../models/user');

	// List all users
	router.get('/all', function(req, res, next){
		User.find({}, function(err, users){
			if (err) return next(err);

			res.json(users);
		});
	});

	router.get('/:username', function(req, res) {
		User.findOne({username: req.params.username}, function (err, user) {
			res.json(user)
		});
	});

	router.post('/create', function(req, res, next){
		var newUser = User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password,
			admin: true
		});

		newUser.save(function(err) {
			if (err) return next(err);

			console.log('User created!');
			res.json({
				code: 200,
				message: 'Successfully created!'
			});
		});
	});

	return router
}