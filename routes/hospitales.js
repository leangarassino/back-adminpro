/*
    Path: 'api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { getHospitals, createHospitals, putHospitals, deleteHospitals } = require('../controllers/hospitalsControllers');
const { validateField } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/validate-jwt');


router.get('/', getHospitals)
router.post('/', [
    validateJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    validateField
], createHospitals)
router.put('/:id', 
    [
        validateJWT, 
        check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
        validateField 
    ]
, putHospitals)
router.delete('/:id', validateJWT, deleteHospitals)

module.exports = router