/*
    Paht: 'api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { getMedics, createMedics, putMedics, deleteMedics } = require('../controllers/medicsControllers');
const { validateField } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get( '/', getMedics)
router.post( '/', [
    validateJWT,
    check('nombre','El nombre del médico es obligatorio').not().isEmpty(),
    check('hospitals','El hospital id debe ser válido').isMongoId(),
    validateField
], createMedics)
router.put( '/:id', putMedics)
router.delete( '/:id', deleteMedics)

module.exports = router



