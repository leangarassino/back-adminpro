const { response } = require('express');
const User = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwtSign');



const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await User.findOne({email})
        
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El email no es válido'
            })
        }

        //Validar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        const token = await generateJWT( usuarioDB.id )
            
        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

module.exports = { login }