const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Party = require("../models/party");
const User = require("../models/user");

const diskStorage = require("../helpers/file-storage");
const upload = multer({ storage: diskStorage });

const verifyToken = require("../helpers/check-token");

const getUserByToken = require("../helpers/get-user-by-token");


// Cadastro de Party
router.post("/", verifyToken, upload.fields([{names: "photos"}]), async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const partyDate = req.body.party_date;

    let files = []

    if(req.files){
        files = req.files.photos;
    }

    if(title == "null" || description == "null", partyDate == "null"){
        res.status(400).json({error: "Preencha pelo menos nome, descrição e data."});
    }

    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    try{
        const user = await User.findOne({ _id: userId });

        let photos = [];

        if(files && files.length > 0){
            files.forEach((photo, i) => {
                photos[i] = photo.path;
            });
        }

        const party = new Party({
            title: title,
            description: description,
            partyDate: partyDate,
            photos: photos,
            privacy: req.body.privacy,
            userId: user._id.toString()
        });

        try{
            const newParty = await party.save();
            res.json({error: null, msg: "Evento criado com sucesso", data: newParty});

        } catch(err){
            res.status(400).json({error });
        }

    } catch(err){
        res.status(400).json({error: "Acesso negado!"});
    }

});

// Retornando todas as festas
router.get("/all", async (req, res) => {

    try{
        const parties = await Party.find({privacy: false}).sort([[ '_id', -1 ]]);
        res.json({eror: null, parties: parties});
    } catch(err){
        return res.status(400).json({ error });
    }
});

// Todas as Festas do usuário
router.get("/userparties", verifyToken, async (req, res) => {

    try{
        const token = req.header("auth-token");

        const user = await getUserByToken(token);

        const userId = user._id.toString();

        const parties = await Party.find({ userId: userId });
        res.json({error: null, parties: parties});
    } catch(error){
        return res.status(400).json({ error });
    }
});

// Retornando todas as festas do usuário
router.get("/userparty/:id", verifyToken, async function(req, res){

    try{
        const token = req.header("auth-token");

        const user = await getUserByToken(token);
    
        const userId = user._id.toString();
    
        const partyId = req.params.id;
    
        const party = await Party.findOne({ _id: partyId, userId: userId });
        res.json({error: null, party: party });
    }
    catch(err){
        return res.status(400).json({ error });
    }
});

// Festas por id (publicas ou privadas)
router.get("/:id", async function(req, res){
    try{
        const id = req.params.id;

        const party = await Party.findOne({ _id: id});

        if(party.privacy === false){
            res.status(400).json({ error: null, party: party });
        } else{
            const token = req.header("auth-token");

            const user = await getUserByToken(token);
        
            const userId = user._id.toString();
            const partyUserId = party.userId.toString();
            
            if(userId == partyUserId){
                res.status(400).json({ error: null, party: party });
            }
        }
    } catch(err){
        return res.status(400).json({ error: "Este evento não existe !" });
    }
})

// delete party
router.delete("/", verifyToken, async (req, res) => {

    try{
        const token = req.header("auth-token");
        const user = await getUserByToken(token);
        const userId = user._id.toString();
        const idParty = req.body.id;

        await Party.deleteOne({ _id: idParty, userId: userId });
        res.json({ error: null, msg: "Evento removido com sucesso" });
    } catch(err){
        res.status(400).json({ error: "Acesso negado !" });
    }
});

module.exports = router;