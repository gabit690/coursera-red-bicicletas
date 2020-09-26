var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe("Testing Bicicletas", function() {

  beforeEach(function(done) {
    mongoose.connection.close().then(() => {
      var mongoDB = 'mongodb://localhost/testdb';
      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.set('useCreateIndex', true);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'MongoDB connection error: '));
      db.once('open', function () {
        console.log('We are connected to test database!');
        done();
      });
    });
  });

  afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success) {
      if (err) console.log(err);
      done();
    });
  });

  describe("Bicicleta.createInstance", () => {
    it("Crea una instancia de Bicicleta", () => {
      var aBici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34, -58]);
      expect(aBici.code).toBe(1);
      expect(aBici.color).toBe('rojo');
      expect(aBici.modelo).toBe('urbana');
      expect(aBici.ubicacion[0]).toBe(-34);
      expect(aBici.ubicacion[1]).toBe(-58);
    });
  });

  describe("Bicicleta.allBicis", () => {
    it("Comienza vacía", (done) => {
      Bicicleta.allBicis(function(err, bicis) {
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe("Bicicleta.add", () => {
    it("Agrega una bicicleta", (done) => {
      var aBici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34, -58]);
      Bicicleta.add(aBici, function(err, newBici){
        if (err) console.log(err);
        Bicicleta.allBicis(function(err, bicis){
          expect(bicis.length).toBe(1);
          expect(bicis[0].code).toBe(aBici.code);
          done();
        });
      });
    });
  });

  describe("Bicicleta.findByCode", () => {
    it("Debe devolver la bici con code 1", (done) => {
      Bicicleta.allBicis(function(err, bicis) {
        expect(bicis.length).toBe(0);
        var aBici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34, -58]);
        Bicicleta.add(aBici, function(err, newBici) {
          if (err) console.log(err);
          var aBici2 = Bicicleta.createInstance(2, 'verde', 'profesional', [-34, -58]);
          Bicicleta.add(aBici2, function(err, newBici) {
            if (err) console.log(err);
            Bicicleta.findByCode(1, function(err, targetBici) {
              expect(targetBici.code).toBe(1);
              expect(targetBici.color).toBe('rojo');
              expect(targetBici.modelo).toBe('urbana');
              done();
            });
          });
        });
      });
    });
  });

  describe("Bicicleta.removeByCode", () => {
    it("Debe quitar la bici con code 1", (done) => {
      Bicicleta.allBicis(function(err, bicis) {
        expect(bicis.length).toBe(0);
        
        var aBici = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34, -58]);
        Bicicleta.add(aBici, function(err, newBici) {
          if (err) console.log(err);

          var aBici2 = Bicicleta.createInstance(2, 'verde', 'profesional', [-34, -58]);
          Bicicleta.add(aBici2, function(err, newBici) {
            if (err) console.log(err);
          
            Bicicleta.removeByCode(1, function(err, result) {
              expect(result.n).toBe(1);
              done();
              
            });
          });
        });
      });
    });
  });

});