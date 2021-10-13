const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

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

module.exports = router;