
const mongoose = require("mongoose");
const Users = mongoose.model("User");
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.env'});
const bcrypt = require('bcrypt');

exports.login = async (req,res) => {
    const user = await Users.findOne({
        email: req.body.email,
    });

    if(!user || user.length < 1){
        res.status(404).json({ response: 'No existe ningun usuario con ese email'});
    }

    const passwordValid = bcrypt.compareSync(req.body.password,user.password);

    if(!passwordValid) {
        res.status(401).json({error: 'La constraseña esta mal'});
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 86400 //24 horas
    });
    res.status(200).json({ auth: true, token: token });
} 

exports.panel = async (req,res) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        res.status(401).json({ auth: false, message: 'No se encontro un TOKEN.' });
    }

    jwt.verify(token,process.env.SECRET, (err,decode) => {
        if(err) {
            res.status(500).json({ auth: false, message: 'No se puedo autenticar el TOKEN.' });
        }
        res.status(200).json({decode, msg:'Bienvenido'});
    })

}