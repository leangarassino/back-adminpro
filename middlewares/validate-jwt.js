const jwt = require('jsonwebtoken')



const validateJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No está autorizado'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid;
        console.log(uid)
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        })
    }


    next();
}

module.exports = { validateJWT }