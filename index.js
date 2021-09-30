require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./databases/config')


const app = express();
app.use(cors());

// Lectura y parseo de rutas

app.use( express.json());

// Usuario: leangcl91
// Password: DoZ2fp8qeqoOpyoe

// Base de Datos

dbConnection();


// Inicializa la aplicación de Express

app.use( '/api/usuarios', require('./routes/usuario') )
app.use( '/api/hospitales', require('./routes/hospitales') )
app.use( '/api/medicos', require('./routes/medicos') )
app.use( '/api/todo', require('./routes/search') )
app.use( '/api/login', require('./routes/auth') )
app.use( '/api/upload', require('./routes/upload') )



app.listen( process.env.PORT, () => {
    console.log('Servidor arrancado en el puerto ' + process.env.PORT)
})
