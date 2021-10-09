const {Router} = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');

const router = Router();

    router.route('/')//   la / hace referencia a ruta principal ('/api/users')
        .get(getUsers)//al acceder a la ruta con metodo get, mandar una respuesta
        .post(createUser)

    router.route('/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser)

module.exports = router;