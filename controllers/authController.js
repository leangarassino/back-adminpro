const { response } = require('express');
const User = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwtSign');
const { googleVerify } = require('../helpers/google-verify');
const { findOne } = require('../models/usuario');



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

const loginGoogle = async (req, res) => {

    const tokenGoogle = req.body.token

    try {
        const {name, email, picture} = await googleVerify(tokenGoogle);
        
        const usuarioDB = await User.findOne({ email });
        let usuario;

        if( !usuarioDB ) {
            usuario = new User({
                nombre: name,
                email,
                img: picture,
                password: '@@@',
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();
        const token = await generateJWT( usuario.id )

        res.json({
            ok: true,
            msg: 'Google Sign In',
            token

        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'El token es incorrecto'
        })
    }


}

module.exports = { login, loginGoogle }