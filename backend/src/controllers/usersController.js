const UserModel = require('../models/User');
const userCtrl = {};//objeto que tendra los metodos necesarios(CRUD

//obtener todos los usuarios
userCtrl.getUsers = async(req,res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
        //res.json("benito cara de esteban, vas a querer?")
    } catch (error) {
        console.log("error: "+error);
    }
};

//obtener un usuario
userCtrl.getUser = async (req,res) => {
    try {
        const ID = req.params.id;
        const user = await UserModel.findById(ID);
        res.json(user)
    } catch (error) {
        console.log("error: "+error);
    }
};

//crear usuario
userCtrl.createUser = async (req,res) => {
    try {
        const {userName} = req.body;
        console.log(userName);
        const newUser = await new UserModel({
            userName:userName
        });
        await newUser.save();
        res.json('user created');
    } catch (error) {
        console.log("error: "+error);
        res.json(error);
    }
};

//actializar usuario
userCtrl.updateUser = async(req,res) => {
    try {
        const ID = req.params.id;
        const {userName} = req.body;
        await UserModel.findByIdAndUpdate(ID,{
            userName: userName
        });
        res.json('usuario actualizado')
    } catch (error) {
        console.log("error: "+error);
    }
};

//eLiminar usuario
userCtrl.deleteUser = async (req,res) => {
    try {
        const ID = req.params.id;
        console.log("usuario a eliminar"+ID);
        await UserModel.findByIdAndDelete(ID);
        res.json('usuario eliminado')
    } catch (error) {
        console.log("error: "+error);
    }
};

module.exports = userCtrl;