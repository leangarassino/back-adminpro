/*
    Path: '/api/todo'
*/

const { Router } = require('express');
const { getTodos, getCollection } = require('../controllers/searchControllers');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:search', validateJWT, getTodos)
router.get('/collection/:table/:search', validateJWT, getCollection)

module.exports = router