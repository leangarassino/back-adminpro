/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { login } = require('../controllers/authController');
const { validateField } = require('../middlewares/fields-validate');




router.post('/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validateField
        ], 
        login
)




module.exports = router