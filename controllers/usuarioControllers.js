const { response } = require('express')
const User = require('../models/usuario')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwtSign')


/* Usuario pruebas "email": "pedro@gmail.com",
	               "password": "123456"
*/


const getUsuarios = async (req, res) => {

    const users = await User.find({}, 'nombre email google role password');

    res.json({
        ok: true,
        users,
        uid: req.uid
    })
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya existe'
            })
        }
        
        const user = new User(req.body);
        
        
        
        // Encriptar contraseñas
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        await user.save();
        const token = await generateJWT( user.id )
        res.json({
            ok: true,
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un error'
        })
    }
}

const putUsuarios = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById( uid  );

        if ( !usuarioDB ) {
                return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        const {password, google, email, ...fields} = req.body;

        if ( usuarioDB.email !== email) {
        
            const emailExist = await User.findOne({ email }); 
            if( emailExist ) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya Existe un usuario con el email que ingresó'
                    })
            }
        }
        
        console.log(usuarioDB)

        fields.email = email;

        const putUser = await User.findByIdAndUpdate( uid, fields, {new: true} )

        
        res.json({
            ok: true,
            user: putUser
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

const deleteUser = async (req, res) => {

    const uid = req.params.id; 
    try {

        const usuarioDB = await User.findById(uid)

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id'
            })
        }
        
        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = { getUsuarios, createUser, putUsuarios, deleteUser }