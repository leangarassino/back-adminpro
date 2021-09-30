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

    try {
        res.json({
            ok: true,
            msg: 'putMedicos'
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

    try {
        res.json({
            ok: true,
            msg: 'deleteMedicos'
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