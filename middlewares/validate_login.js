const validator = require('validator');


const validateLogin = (req, res, next) => 
{

    const params = req.body;

    try
    {

        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = !validator.isEmpty(params.password) && validator.isByteLength(params.password,{min:6, max: 300});

        if(validate_email && validate_password){
            next();
        }else{
            return res.status(400).json({
            status: 'error',
            message: 'Ingrese datos correctos',
            email: validate_email, 
            password: validate_password
            });
        }


    }catch (error){
        return res.status(400).json({
            error: 'Los datos ingresados son incorrectos'
        });
    }

}

module.exports = validateLogin;