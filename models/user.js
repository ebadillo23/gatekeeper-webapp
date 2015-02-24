var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  sso: String,
  pin: String
});

userSchema.statics.findBySSO = function(sso, callBack) {
  this.findOne({
    sso: sso
  }, callBack);
}

userSchema.statics.saveNewUser = function(name, sso, pin, callBack) {
  if (!(name && name.length)) {
    return callBack(new Error('Invalid name'));
  }
  if (!(sso && sso.length && sso.length === 9 && !isNaN(parseInt(sso)))) {
    return callBack(new Error('Invalid SSO'));
  }
  if (!(pin && pin.length && pin.length === 4 && !isNaN(parseInt(pin)))) {
    return callBack(new Error('Invalid PIN'));
  }
  this.create({
    name: name,
    sso: sso,
    pin: pin
  }, callBack);
}

module.exports = mongoose.model('User', userSchema);
