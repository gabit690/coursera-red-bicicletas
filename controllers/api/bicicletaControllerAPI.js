var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {

  Bicicleta.allBicis(function(err, bicis) {
    res.status(200).json({
      bicicletas: bicis
    });
  });

}

exports.bicicleta_create = function(req, res) {

  var bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]);

  Bicicleta.add(bici, function(err, newBici) {
    
      res.status(200).json({
        bicicleta: newBici
      });

  });
}

exports.bicicleta_update = function(req, res) {

  Bicicleta.findByCode(req.body.code, function(err, targetBici) {
    targetBici.color = req.body.color;
    targetBici.modelo = req.body.modelo;
    targetBici.ubicacion = [req.body.lat, req.body.lng];
    res.status(200).send();
  });

}

exports.bicicleta_delete = function(req, res) {
  Bicicleta.removeByCode(req.body.code, function(err, result) {
    res.status(204).send();
  });
}