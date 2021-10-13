const jwt = require("jsonwebtoken");

// Middleware para validação do token
const checkToken = (req, res, next) => {

    const tokken = req.header("auth-token");

    if(!tokken){
        res.status(401).json({ error: "Acesso negado!" });
    }

    try{
        const verified = jwt.verify(tokken, "nossosecret");
        req.user = verified;
        next(); // Continua

    } catch(err){
        res.status(400).json({ error: "O token é invalida!" });
    }
}

module.exports = checkToken;