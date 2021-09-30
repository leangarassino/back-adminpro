const { Router } = require('express');
const { fileUpload, returnImage } = require('../controllers/uploadControllers');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use( expressFileUpload() );

router.put('/:type/:id', validateJWT, fileUpload)
router.get('/:type/:image', returnImage)

module.exports = router