var jwt = require('jsonwebtoken'); 
require('dotenv').config({ path: '.env'});

exports.verifyToken = (req, res, next) => {

  // verificamos si viene el token
  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).json({ auth: false, message: 'Falta el TOKEN.' });

 //verificamos el tocken
  jwt.verify(token, process.env.SECRET, function(err, decoded) {      
    if (err) 
      return res.status(500).json({ auth: false, message: 'No se pudo atutenticar el TOKEN.' });    

    //si esta todo bien, seguimos
    req.userId = decoded.id;
    next();
  });

}