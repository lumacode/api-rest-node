'use strict'

//Cargar modulos de node para crear el sv
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


//Ejecutar express http
const app = express();
//Cargar ficheros rutas 

const articleRouter = require ('./routes/article');
const authRouter = require ('./routes/auth');



app.use(express.json());

//Cargar CORS permite peticiones del frontend acceso cruzado entre dominios
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Agregar prefijos a rutas / cargar rutas

app.use('/api', articleRouter);
app.use('/api/user', authRouter);


//Exportar modulo (fichero actual)
module.exports = app;


