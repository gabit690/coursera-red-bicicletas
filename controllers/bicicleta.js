var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res, next) {
  Bicicleta.find({}, (err, bicis) => {
    res.render('bicicletas/index', {bicis: bicis});
  });
}

exports.bicicleta_create_get = function(req, res) {
  res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
  var bici = new Bicicleta({code: req.body.code, color:  req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]});
  Bicicleta.add(bici, function(err, nuevaBici) {
    if (err) {
      console.log('HUBO UN ERROR AL CREAR LA BICICLETA');
    } else {
      res.redirect('/bicicletas');
    }
  });
}

exports.bicicleta_update_get = function(req, res) {
  Bicicleta.findById(req.params.id, function(err, bici) {
    res.render('bicicletas/update', {bici});
  });

}

exports.bicicleta_update_post = function(req, res) {

  var update_values = {code: req.body.code, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]};
  
  Bicicleta.findByIdAndUpdate(req.params.id, update_values, {new: true}, function(err, nuevaBici) {
    if (err) {
      console.log('ERROR EN LA ACTUALIZACION DE BICICLETA.');
    } else {
      res.redirect('/bicicletas');
      return;
    }
  });

}

exports.bicicleta_delete_post = function(req, res, next) {

  Bicicleta.findByIdAndDelete(req.body.id, function(err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/bicicletas');
    }
  });

}