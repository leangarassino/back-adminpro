/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { login, loginGoogle, renewToken } = require('../controllers/authController');
const { validateField } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/validate-jwt');




router.post('/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validateField
        ], 
        login
)

router.post('/google', 
        [
            check('token', 'El token es obligatorio').not().isEmpty(),
            validateField
        ],
        loginGoogle
)

router.get('/renew', validateJWT, renewToken)




module.exports = router