var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe("Testing Usuarios", function() {

  beforeEach(function(done) {
    mongoose.connection.close().then(() => {
      var mongoDB = 'mongodb://localhost/testdb';
      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.set('useCreateIndex', true);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error: '));
      db.once('open', function () {
        console.log('We are connected to test database!');
        done();
      });
    });
  });

  afterEach(function(done) {
    Reserva.deleteMany({}, function(err, success) {
      if (err) console.log(err);
      Usuario.deleteMany({}, function(err, success) {
        if (err) console.log(err);
        Bicicleta.deleteMany({}, function(err, success) { 
          if (err) console.log(err);
          done();
        });
      });
    });
  });

  describe("Cuando un Usuario reserva una bici", () => {
    it("Debe existir la reserva", (done) => {
      const usuario = new Usuario({nombre: 'Ezequiel'});
      usuario.save();
      const bicicleta = new Bicicleta({code:1, color: 'verder', modelo: 'Urbana'});
      bicicleta.save();
      var hoy = new Date();
      var maniana = new Date();
      maniana.setDate(hoy.getDate() + 1);
      usuario.reservar(bicicleta.id, hoy, maniana, function(err, reserva) {
        Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas) {
          // console.log(reservas[0]);
          expect(reservas.length).toBe(1);
          expect(reservas[0].diasDeReserva()).toBe(2);
          expect(reservas[0].bicicleta.code).toBe(1);
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
          done();
        });
      });

    });
  });

});