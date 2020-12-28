const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});


mongoose.connect(process.env.DATABASE, {useNewUrlParser:true,useUnifiedTopology: true});

mongoose.connection.on('error', (error) => {
    console.log(error);
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//modelos
require('../models/Users');