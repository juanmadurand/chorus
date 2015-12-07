module.exports = function(context) {

	var express = require('express'),
	router = express.Router();

	// We'll use user.js as a controller for /user/*
	// router.use('/user', require('./user')(context))

	router.get('/', function(req, res){
		res.render('index')
	})

	return router
}