const { response } = require('express');
const User = require('../models/usuario')
const Hospitals = require('../models/hospitals')
const Medics = require('../models/medics')


const getTodos = async (req, res) => {

    try {
        
        const search = req.params.search;
        const regex = new RegExp(search, 'i')

        const [users, hospitals, medics] = await Promise.all([
            User.find({nombre: regex}),
            Hospitals.find({nombre: regex}),
            Medics.find({nombre: regex})
        ])

        res.json({
            ok: true,
            users,
            hospitals,
            medics
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }
}

const getCollection = async (req, res) => {


    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i')

    let data = [];

    switch (table) {
        case 'medicos':
            data = await Medics.find({nombre: regex}).populate('user','nombre email')
                                                     .populate('hospitals', 'nombre')
            break;
        case 'hospitals':
            data = await Hospitals.find({nombre: regex}).populate('user','nombre email')
            break;
        case 'users':
            data = await User.find({nombre: regex})
            break;    
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser medicos/hospitals/users'
            })
    }

    res.json({
        ok: true,
        resultado: data
    })

}


module.exports = { getTodos, getCollection }