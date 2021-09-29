/*
 Ruta: 'api/usuarios
*/



const { Router } = require('express')
const { getUsuarios, createUser, putUsuarios, deleteUser } = require('../controllers/usuarioControllers')
const { check } = require('express-validator')
const { validateField } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getUsuarios)
router.post( '/', 
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validateField
    ]
    ,createUser 
)

router.put('/:id', 
    [   validateJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').isEmpty(),
        validateField
    ],
    putUsuarios
)

router.delete('/:id', validateJWT, deleteUser)


module.exports = router