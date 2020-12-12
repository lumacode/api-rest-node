'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useUnifiedTopology: true,
useNewUrlParser: true})
        .then(() => {
                console.log('La conexion a la db se ha realizado correctamente!!!');
    
                //crear servidor y escuchar pet http 

                app.listen(port, () => {
                    console.log('Servidor corriendo en http://localhost:'+port);
                });
        
            })
        .catch(e => console.log('error db: ', e))