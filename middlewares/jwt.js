const jwt = require ('jsonwebtoken');

const verifyToken = (req, res, next) =>{

    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        next(); // continuamos
    } catch (error) {
        res.status(403).json({error: 'El token no es válido'})
    }

}


module.exports = verifyToken;
