'use strict'

const validator = require('validator');


const validateRegister = (req, res, next) => 
{

    const params = req.body;

    try{

        const validate_name = !validator.isEmpty(params.name);
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = !validator.isEmpty(params.password) && validator.isByteLength(params.password,{min:6, max: 300});

        if(validate_name && validate_email && validate_password){
            next();
        }else{
            return res.status(422).json({
            status: 'error',
            message: 'Ingrese datos correctos',
            name: validate_name, 
            email: validate_email, 
            password: validate_password
            });
        }


    }catch (error){
        return res.status(500).json({
            error: errorGeneral
        });
    }

}

module.exports = validateRegister;