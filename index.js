require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./databases/config')


const app = express();
app.use(cors());

// Usuario: leangcl91
// Password: DoZ2fp8qeqoOpyoe

// Base de Datos

dbConnection();


// Inicializa la aplicación de Express

app.get( '/', (req, res) => {

    res.json(
        {
            ok: true,
            msg: 'Hola Mundo'
        }
    )

})



app.listen( process.env.PORT, () => {
    console.log('Servidor arrancado en el puerto ' + process.env.PORT)
})
