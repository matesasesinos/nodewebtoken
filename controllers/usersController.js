const mongoose = require("mongoose");
const Users = mongoose.model("User");
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.env'});
//const { body, validationResult } = require('express-validator');

exports.userGet = async (req,res) => {
    try{
        const users = await Users.find();
        if(!users || users.length < 1) {
            res.status(200).json({error: 'No hay usuarios registrados'});
        }
        res.status(200).json({users});
    } catch(error) {
        res.status(500).json({error: `Error: ${error}`});
    }
}

exports.userNew = async (req,res) => {
    const { name,email,password } = req.body;
    try{
        const user = await Users.create({
            name,
            email,
            password,
            created: Date.now()
        });
        const token = jwt.sign({ id:user._id }, process.env.SECRET, {
            expiresIn: 86400 //24 horas
        });
        res.status(200).json({ auth: true, token: token });

    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
}