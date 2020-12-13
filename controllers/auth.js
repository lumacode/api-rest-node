'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const controller = {
    register: async (req, res) => {

        const params = req.body;

        //Buscamos si exsite el correo

        const isEmailExist = await User.findOne({ email: params.email });
        if (isEmailExist) {
            return res.status(400).json({error: 'Email ya registrado'})
        }

        //hash password 

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(params.password, salt)

        //asignar valores
        const user = new User();
        user.name = params.name;
        user.email = params.email;
        user.password = password;

        //guardar el articulo
        user.save((err, userStored) =>{
                if(err || !userStored){
                    return res.status(400).json({
                    status: 'error',
                    message: 'El usuario no se ha guardado!'
                    });

                }
     
                    //devuelvo respuesta positiva
                    return res.status(200).json({
                    status: 'success',
                    userId: userStored._id
                    });
        });
        
    },


    login: async (req, res) => {

        const params = req.body;

            const user = await User.findOne({ email: params.email });
            if (!user) return res.status(401).json({error: true, message: 'Credenciales incorrectas(e)'});

            const validatePassword = await bcrypt.compare(params.password, user.password);
            if (!validatePassword) return res.status(401).json({error: true, message: 'Credenciales incorrectas'});

            //Create token 
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                name: user.name,
                id: user._id
            }, process.env.TOKEN_SECRET);

            //Mensaje de bienvenida

            res.header('auth-token', token).json({
                error: null,
                data: {token}
            });

    }
   

}; //end controller 

module.exports = controller;