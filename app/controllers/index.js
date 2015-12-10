module.exports = function(context) {

	var express = require('express');
	var router = express.Router();
	var auth = require('../middlewares/auth');

	router.route('/login')
	.get(function(req, res, next){
		res.render('login');
	})
	.post(auth.login);

	router.get('/logout', auth.logout);

	// We'll use user.js as a controller for /user/*
	router.use('/api/user', require('./user')(context));

	router.get('/', function(req, res){
		res.render('index');
	});

	router.get('/about', auth.requireAuth, function(req, res){ // Requires authentication
		res.render('index');
	});

	return router;
}
