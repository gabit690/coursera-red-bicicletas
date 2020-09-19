var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

beforeEach(() => {
  Bicicleta.allBicis = [];
});

describe("Bicicleta API", () => {
  describe('GET BICICLETAS /', () => {
    it("Status 200", (done) => {

      var a = new Bicicleta(1, 'negro', 'urbana', [-34.6012424, -58.3861497]);

      Bicicleta.add(a);

      request.get('http://localhost:5000/api/bicicletas', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });

    })
  })

  describe('POST BICICLETAS /create', () => {
    it("Status 200", (done) => {

      var headers = {'Content-type': 'application/json'};

      var aBici = {
        "id": 10, 
        "color": "rojo", 
        "modelo": "urbana", 
        "lat": -34, 
        "lng": -54
      };

      request.post({
        headers: headers,
        url: 'http://localhost:5000/api/bicicletas/create',
        body: JSON.stringify(aBici)
      }, function(error, response, body) {

        expect(response.statusCode).toBe(200);
        expect(Bicicleta.findById(10).color).toBe('rojo');
        done();

      })

    })
  })

  describe('PUT BICICLETAS /update', () => {
    it("Status 200", (done) => {
      
      var a = new Bicicleta(10, 'negro', 'urbana', [-34.6012424, -58.3861497]);

      Bicicleta.add(a);
      
      var headers = {'Content-type': 'application/json'};

      var aBici = {
        "id": 10, 
        "color": "rojo", 
        "modelo": "dorado", 
        "lat": -34, 
        "lng": -54
      };

      request.put({
        headers: headers,
        url: 'http://localhost:5000/api/bicicletas/update',
        body: JSON.stringify(aBici)
      }, function(error, response, body) {

        var biciUpdated = Bicicleta.findById(aBici.id);

        expect(response.statusCode).toBe(200);
        expect(biciUpdated.id).toBe(aBici.id);
        expect(biciUpdated.color).toBe(aBici.color);
        expect(biciUpdated.modelo).toBe(aBici.modelo);
        expect(biciUpdated.ubicacion[0]).toBe(aBici.lat);
        expect(biciUpdated.ubicacion[1]).toBe(aBici.lng);

        done();

      })

    })
  })

  describe('DELETE BICICLETAS /delete', () => {
    it("Status 204", (done) => {
      
      var a = new Bicicleta(10, 'negro', 'urbana', [-34.6012424, -58.3861497]);

      Bicicleta.add(a);

      var headers = {'Content-type': 'application/json'};

      var aBici = {
        "id": 10
      };

      request.delete({
        headers: headers,
        url: 'http://localhost:5000/api/bicicletas/delete',
        body: JSON.stringify(aBici)
      }, function(error, response, body) {

        expect(response.statusCode).toBe(204);
        expect(Bicicleta.allBicis.length).toBe(0);

        done();

      })

    })
  })
  
});