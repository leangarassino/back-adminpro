const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const { putImage } = require('../helpers/putImage');
const path = require('path')
const fs = require('fs')


const fileUpload = (req, res) => {

    const type = req.params.type;
    const id = req.params.id;

    const validateTypes = ['users', 'medicos', 'hospitals'];

    if ( !validateTypes.includes(type) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo ingresado debe ser users/medicos/hospitals'
        })
    }
    // Validación de que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe ningún archivo'});
      }

    const file = req.files.imagen;

    const cutName = file.name.split('.') 
    const extension = cutName[cutName.length -1];
    
    const validateExtension = ['png', 'jpg', 'jpeg', 'gif']

    if ( !validateExtension.includes(extension) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'});
    }

    // Generar uuid / Nombre del archivo

    const fileName = `${uuidv4()}.${extension}`

    const path = `./upload/${type}/${fileName}`

    // Mover la imagen

    
    file.mv(path, (err) => {
        if (err)
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido mover la imagen'
        })
        
        putImage( type, id, fileName);

          res.json({
              ok: true,
              msg: 'se ha subido la imagen',
              fileName
          })
        
      });
}

const returnImage = (req, res = response) => {

    const type = req.params.type;
    const image = req.params.image;



    const pathImg = path.join( __dirname, `../upload/${type}/${image}` )

    if (fs.existsSync( pathImg )) {
        res.sendFile( pathImg )
    } else {
        const pathImg = path.join( __dirname, `../upload/no-image.jpg`)
        res.sendFile( pathImg )
    }


}

module.exports = { fileUpload, returnImage }