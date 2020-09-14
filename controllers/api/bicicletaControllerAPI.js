var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
  res.status(200).json({
    bicicletas: Bicicleta.allBicis
  });
}

exports.bicicleta_create = function(req, res) {
  var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];

  Bicicleta.add(bici);

  res.status(200).json({
    bicicleta: bici
  });
}

exports.bicicleta_update = function(req, res) {
  
  for (let index = 0; index < Bicicleta.allBicis.length; index++) {
    if (Bicicleta.allBicis[index].id == req.body.id) {
      Bicicleta.allBicis[index].color = req.body.color;
      Bicicleta.allBicis[index].modelo = req.body.modelo;
      break;
    }
  }

  res.status(200).send();
}

exports.bicicleta_delete = function(req, res) {
  Bicicleta.removeById(req.body.id);
  res.status(204).send();
}
