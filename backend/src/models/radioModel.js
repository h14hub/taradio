var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var radioSchema = new Schema({
	'name' : String,
	'frequency' : Number,
	'city' : String,
	'streetNumber' : Number,
	'streetName' : String,
	'zipCode' : Number,
	'lng' : Number,
	'lat' : Number,
	'radioType' : String,
	'diffusionType' : String,
	'slogan' : String,
	'created_at' : String,
	'updated_at' : String,
	'streamUrl' : String,
	'logoUrl' : String,
	'published' : Boolean,
});

module.exports = mongoose.model('radio', radioSchema);