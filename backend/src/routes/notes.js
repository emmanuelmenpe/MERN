const {Router} = require('express');
const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController');

const router = Router();

    router.route('/')//hace referencia a ruta principal ('/api/notes')
        .get(getNotes)//al acceder a la ruta con metodo get, utiliza metodo getNotes de notesController
        .post(createNote);//al acceder a la ruta con metodo post, utiliza metodo createNote de notesController

    router.route('/:id')//hace referencia a ruta principal ('/api/notes/5')
        .get(getNote)//al acceder a la ruta con metodo get, utiliza metodo getNote de notesController
        .put(updateNote)//al acceder a la ruta con metodo update, utiliza metodo updateNote de notesController
        .delete(deleteNote);//al acceder a la ruta con metodo delete, utiliza metodo deleteNote de notesController

module.exports = router;