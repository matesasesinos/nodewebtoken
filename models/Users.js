const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'El nombre es obligatorio'
    },
    email: {
        type: String,
        unique: true,
        required: 'El email es obligatorio'
    },
    password: {
        type: String,
        required: 'La contraseña es obligatoria'
    },
    created: Date
});

//password Hash
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { //si esta hasheado el password no hacer nada
        return next();
    }
    //hash
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

userSchema.post('save', async function(error,doc,next) {
    if(error.name === 'MongoError' && error.code === 11000){
        next('El correo ya esta en uso');
    } else {
        next(error);
    }
});

//autenticar usuarios
userSchema.methods = {
    comparePassword: function(password) {
        return bcrypt.compareSync(password,this.password);
    }
}

module.exports = mongoose.model('User', userSchema);