const { response } = require('express')
const Medics = require('../models/medics')


const getMedics = async (req, res) => {

    try {

        const medics = await Medics.find()
                                   .populate('user','nombre')
                                   .populate('hospitals','nombre')

        res.json({
            ok: true,
            medics
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Ha ocurrido un error'
        })
    }
}
const createMedics = async (req, res) => {

    const uid = req.uid
    const medics = new Medics({
        user: uid,
        ...req.body
    })
    
    console.log(uid)

    try {

        const medicsDB = await medics.save()        

        res.json({
            ok: true,
            medics: medicsDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Ha ocurrido un error'
        })
    }
}
const putMedics = async (req, res) => {

    id = req.params.id
    uid = req.uid

    try {

        const medicsDB = await Medics.findById( id )
        if ( !medicsDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el médico con el id'
            })
        }

        const changeMedics = {
            ...req.body,
            usuario: uid
        }

        const putMedics = await Medics.findByIdAndUpdate(id, changeMedics, {new:true})

        res.json({
            ok: true,
            putMedics
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Ha ocurrido un error'
        })
    }
}
const deleteMedics = async (req, res) => {

    id = req.params.id;

    try {

        const medicsDB = await Medics.findById( id )

        if ( !medicsDB ) { 
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado el médico por el id'
            })
        }

        await Medics.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Se ha eliminado el médico correctamente'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Ha ocurrido un error'
        })
    }
}

module.exports = {
    getMedics,
    createMedics,
    putMedics,
    deleteMedics
}