const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    if(name == null || email == null || password == null || confirmPassword == null){
        return res.status(400).json({error: "Os campos não podem ficar em branco"});
    }

    if(password != confirmPassword){
        return res.status(400).json({error: "Senha e confirmar senha não estão iguais"});
    }

    const emailExist = await User.findOne({email: email});

    if(emailExist){
        return res.status(400).json({error: "O e-mail já esta em uso"});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    });

    try{

        const newUser = await user.save();

        const token = jwt.sign(
            {
                name: newUser.name,
                id: newUser._id
            },
            "nossosecret"
        );

        res.json({error: null, msg: "Você realizou o cadastro com sucesso", token: token, userId: newUser._id});

    } catch(error){
        res.status(400).json({error});
    }

});

// Login
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if(!user){
        return res.status(400).json({error: "Não há usuário cadastrado com este E-mail"});
    }
 
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
        return res.status(400).json({error: "Senha invalida!"});
    }

    const newUser = await user.save();

    const token = jwt.sign(
        {
            name: user.name,
            id: user._id
        },
        "nossosecret"
    );

    res.json({error: null, msg: "Você está autenticado !", token: token, userId: user._id});    

});

module.exports = router;

