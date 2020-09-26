var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const validateEmail = function(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "¡¡¡ El nombre es obligatorio !!!."]
  },
  email: {
    type: String,
    trim: true,
    required: [true, "¡¡¡ El email es obligatorio !!!."],
    lowercase: true,
    validate: [validateEmail, "¡¡¡ Por favor ingresa un email válido !!!."],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/]
  },
  password: {
    type: String,
    required: [true, "¡¡¡ El password es obligatorio !!!."]
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.pre('save', function(next) {
  console.log("SE EJECUTO EL PRE DEL SAVE DEL USUARIO");
  if (this.isModified('password')) {
    this.password = bcrypt.hashsync(this.password, saltRounds);
  }
  next();
});

usuarioSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
  var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
  // console.log(reserva);
  reserva.save(cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);