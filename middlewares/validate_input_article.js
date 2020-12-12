const validator = require('validator');


const validateSave = (req, res, next) => {
     
    //Recoger parametros por post 
     const params = req.body;
        
    //Validar datos con validator
    try
    {

            const validate_title = !validator.isEmpty(params.title);
            const validate_content = !validator.isEmpty(params.content);

            if(validate_title && validate_content)
            {
                next();
            }else
            {
                return res.status(422).json({
                status: 'error',
                message: 'Los campos no pueden estar vacios',
                title: validate_title, 
                content: validate_content
                });
            }
    }   catch (error)
        {
            return res.status(422).json({
                error: 'Los datos ingresados son incorrectos'
            });
        }

}


module.exports = validateSave;