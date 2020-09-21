var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = 'http://localhost:5000/api/bicicletas';

describe("Bicicleta API", () => {

  beforeEach(function(done) {

    mongoose.connection.close().then(() => {
      var mongoDB = 'mongodb://localhost/testdb';
      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.set('useCreateIndex', true);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error: '));
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

  describe('GET BICICLETAS /', () => {
    it("Status 200", (done) => {

      request.get(base_url, function(error, response, body) {
        var result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.bicicletas.length).toBe(0);
        done();
      });

    });
  });

  describe('POST BICICLETAS /create', () => {
    it("Status 200", (done) => {

      var headers = {'Content-type': 'application/json'};

      var aBici = {
        "code": 10,
        "color": "rojo",
        "modelo": "urbana",
        "lat": -34,
        "lng": -54
      };

      request.post({
        headers: headers,
        url: base_url + '/create',
        body: JSON.stringify(aBici)
      }, function(error, response, body) {

        expect(response.statusCode).toBe(200);

        var bici = JSON.parse(body).bicicleta;
        expect(bici.color).toBe('rojo');
        expect(bici.ubicacion[0]).toBe(-34);
        expect(bici.ubicacion[1]).toBe(-54);
        done();

      });

    });
  });

  describe('PUT BICICLETAS /update', () => {
    it("Status 200", (done) => {

      var a = Bicicleta.createInstance(10, 'negro', 'urbana', [-34.6012424, -58.3861497]);

      Bicicleta.add(a, function(err, newBici) {
        
        var headers = {'Content-type': 'application/json'};
  
        var aBici = {
          "code": 10,
          "color": "rojo",
          "modelo": "dorado",
          "lat": -34,
          "lng": -54
        };
  
        request.put({
          headers: headers,
          url: base_url + '/update',
          body: JSON.stringify(aBici)
        }, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });

      });

    });
  });

  describe('DELETE BICICLETAS /delete', () => {
    it("Status 204", (done) => {

      Bicicleta.allBicis(function(err, bicis) {
        expect(bicis.length).toBe(0);

        var a = Bicicleta.createInstance(1, 'negro', 'urbana', [-34.6012424, -58.3861497]);
  
        Bicicleta.add(a, function(err, newBici) {
  
          var b = Bicicleta.createInstance(2, 'verde', 'campo', [-34, -58]);

          Bicicleta.add(b, function(err, newBici2) {
            
            var headers = {'Content-type': 'application/json'};
      
            var aBici = {
              "code": 1
            };
      
            request.delete({
              headers: headers,
              url: base_url + '/delete',
              body: JSON.stringify(aBici)
            }, function(error, response, body) {
              expect(response.statusCode).toBe(204);
              done();
            });
            
          });
        });
      });
    });
  });
});