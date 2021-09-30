const User = require('../models/usuario')
const Medics = require('../models/medics')
const Hospitals = require('../models/hospitals');
const { response } = require('express');
const fs = require('fs');


const putImage = async (type, id, fileName) => {

    let pathOld = '';

    switch (type) {
        case 'medicos':
            const medics = await Medics.findById(id);
            if (!medics) {
                console.log('El id no es de un médico')
                return false
            }
            pathOld = `./upload/medicos/${medics.img}`
            if ( fs.existsSync(pathOld)) {
                fs.unlinkSync(pathOld)
            } 

            medics.img = fileName
            await medics.save()
            return true

            break;
        case 'hospitals':

            const hospital = await Hospitals.findById(id);
            if (!hospital) {
                console.log('El id no es de un hospital')
                return false
            }
            pathOld = `./upload/hospitals/${hospital.img}`
            if ( fs.existsSync(pathOld)) {
                fs.unlinkSync(pathOld)
            } 

            hospital.img = fileName
            await hospital.save()
            return true
        
            break;
        case 'users':

            const user = await User.findById(id);
            if (!user) {
                console.log('El id no es de un usuario')
                return false
            }
            pathOld = `./upload/users/${user.img}`
            if ( fs.existsSync(pathOld)) {
                fs.unlinkSync(pathOld)
            } 

            user.img = fileName
            await user.save()
            return true
        
            break;
    }


}

module.exports = { putImage }