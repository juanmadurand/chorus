var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

userSchema.pre('save', function(next) {
	// if created_at doesn't exist, add to that field
	if (!this.register_date){
		this.register_date = new Date();
	}

	next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
