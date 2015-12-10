module.exports = function (app){
	if (app.get('env') === 'development') {

		app.use(function(err, req, res, next) {
			res.json({
				message: err.message,
				error: err
			});
		});

	}

	// Production error handler
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}
