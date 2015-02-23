var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	modelName: String,  
  modelNumber: String,
  manufacturer: String,
  serialNumber: String,
  events: [eventSchema]
});

module.exports = mongoose.model('Device', deviceSchema);
