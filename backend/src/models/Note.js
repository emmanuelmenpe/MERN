const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    title: String,
    content: {//se puede definir un objeto para tener mas espesificaiones
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: String,

}, {
    timestamps: true//agrega feca de creacion y de actualizacion
});

//exportarlo
module.exports = model('Note', noteSchema);//'note': nombre de modelo, noteSchema: esquema que usara