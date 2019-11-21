var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var radioSchema = new Schema({
	'name' : String,
	'federation' : String,
	'associationName' : String,
	'siret' : String,
	'address' : String,
	'zipCode' : String,
	'city' : String,
	'siteUrl' : String,
	'published' : Boolean,
	'logoUrl' : String,
	'streamUrl' : String,
	'diffusionArea' : String,
	'presidentFullName' : String,
	'email' : String,
	'administrativePhone' : String,
	'phone' : String,
	'lat' : Number,
	'lng' : Number,
	'slogan' : String,
	'frequency' : String,
	'radioType' : String,
});

module.exports = mongoose.model('radio', radioSchema);
