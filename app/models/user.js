var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: Boolean,
	age: Number,
	register_date: Date
});

// Set Register date
userSchema.pre('save', function(next) {
	if (!this.register_date){
		this.register_date = new Date();
	}

	next();
});

// Hash password
userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')){
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err){
			return next(err);
		}

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err){
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, cb);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
