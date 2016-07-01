var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var heroSchema = new Schema ({
  alias: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  city: { type: String },
  power_name: { type: String }
});

var Hero = mongoose.model( "heroes", heroSchema );

module.exports = Hero;
