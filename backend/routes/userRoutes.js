const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

const getUserByToken = require("../helpers/get-user-by-token");

// Module para verificar o tokken
const verifyToken = require("../helpers/check-token");

// GET por id
router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findOne({ _id: id }, { password: 0 });

        res.json({error: null, msg: user});
    } catch(err){
        return res.status(400).json({error: "O usuário não existe"});
    }
});

// PUT
router.put("/", verifyToken, async (req, res) => {
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const userReqId = req.body.id;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const userId = user._id.toString();

    if(userId != userReqId){
        res.status(401).json({ error: "Acesso negado!" });
    }

    const updateData = {
        name: req.body.name,
        email: req.body.email
    };

    if(password != confirmPassword){
        res.status(401).json({ error: "As senhas não conferem!" });
    } else if(password == confirmPassword && password != null){
        const salt = await bcrypt.genSalt(12);
        const reqPassword = req.body.password;
        const passwordHash = await bcrypt.hash(reqPassword, salt);

        req.body.password = passwordHash;

        updateData.password = passwordHash;
    }

    try{
        const updatedUser = await User.findOneAndUpdate({ _id: userId}, {$set: updateData }, {new: true});
        res.json({ error: null, msg: updatedUser});

    } catch(err){
        res.status(401).json({ error });
    }
});

module.exports = router;