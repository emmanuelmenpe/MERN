const NoteModel = require('../models/Note');
const notesCtrl = {}; //objeto que tendra los metodos necesarios(CRUD)

//obtener todas las notas
notesCtrl.getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find();//retorna las notas: [{},{},...]
        res.json(notes)  
    } catch (error) {
        console.log("error: "+error);
    }
};

//obtener una nota
notesCtrl.getNote = async (req, res) => {
    try {
        const ID = req.params.id;
        console.log(ID);
        const note = await NoteModel.findById(ID);
        console.log(note);
        res.json(note)
    } catch (error) {
        console.log("error: "+error);
    }
};

//crear nota
notesCtrl.createNote = async (req, res) => {
    try {
        const {title, content, date, author} = req.body;
        console.log(req.body);
        const newNote = new NoteModel({//crear nota
            title:title,
            content:content,
            date:date,
            author:author
        });
        console.log(newNote);
        await newNote.save();//guardar nota
        res.json('GET - note saved')
    } catch (error) {
        console.log("error: "+error);
    }
};

//actualizar nota
notesCtrl.updateNote = async (req,res) => {
    try {
        const ID = req.params.id;
        const {title, content, date, author} = req.body;
        await NoteModel.findByIdAndUpdate(ID, {//findOneAndUpdate
            title:title,//tambien se puede con solo poner title
            content:content,
            date:date,
            author:author
        });
        res.send('PUT - nota edita')
    } catch (error) {
        console.log("error: "+error);
    }
};

//eliminar nota
notesCtrl.deleteNote = async(req,res) => {
    try {
        const ID = req.params.id
        await NoteModel.findByIdAndDelete(ID);//findOneAndDelete
        res.send('DELETE - eliminar nota')
    } catch (error) {
        console.log("error: "+error);
    }
    
};

module.exports = notesCtrl;