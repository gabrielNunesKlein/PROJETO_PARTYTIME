// modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const partyRoutes = require("./routes/partyRouters");

// middlewares

// config
const dbName = "partytime";
const port = 3000;

// coxao com mongodb
mongoose.connect(
    `mongodb://localhost/${dbName}`,
    {
        useNewUrlParser: true,
        //useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/party", partyRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Rota teste"});
});

app.listen(port, function(){
    console.log("Backend está rodando na porta: ", port);
});