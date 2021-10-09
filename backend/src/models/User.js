const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    userName:{
        type: String,
        required : true,
        trim: true,//limpia exesos de espaciado
        unique: true//que el nombre sea unico
    },
    date: {
        type: Date,
        default: Date.now
    },
},{timestamps:true});

module.exports = model('User',userSchema); 