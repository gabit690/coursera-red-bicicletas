var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  valueToken: String,
  fechaDeCreacion: Date
});

module.exports = mongoose.model('Token', tokenSchema);