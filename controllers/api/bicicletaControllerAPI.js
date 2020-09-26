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
  // bici.save(function(err){
  //   res.status(200).json(bici);
  // });
  Bicicleta.add(bici, function(err, newBici) {
    
      res.status(200).json({
        bicicleta: newBici
      });

  });
}

exports.bicicleta_update = function(req, res) {

  Bicicleta.update({code: req.body.code }, { color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng] }, function (error, writeOpResult) {
    res.status(200).send();
  });

}

exports.bicicleta_delete = function(req, res) {
  Bicicleta.removeByCode(req.body.code, function(err, result) {
    res.status(204).send();
  });
}