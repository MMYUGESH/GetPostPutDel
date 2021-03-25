//const os = require("os")
//const fs = require("fs");
const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.d_url;//"mongodb+srv://demouser:SN9fmxZIFUjj61cE@cluster0.il6bg.mongodb.net/dj_db?retryWrites=true&w=majority"//
console.log(process.env);


//"mongodb+srv://demouser:SN9fmxZIFUjj61cE@cluster0.il6bg.mongodb.net/dj_db?retryWrites=true&w=majority"

const objectId = mongodb.ObjectID
app.use(express.json());
var gregorianDate = null;


app.get("/student", (req, res) => {
    mongoClient.connect(url, (err, clientInfo) => {
        let db = clientInfo.db("dj_db");
        db.collection("users").find().toArray().then((data) => {
            res.status(200).json(data)
            clientInfo.close();
        })

            .catch((error) => console.log(error));

    })

});

app.post("/add", (req, res) => {
    mongoClient.connect(url, (err, client) => {
        let db = client.db("dj_db");
        db.collection("users").insertOne(req.body).then((data) => {
            res.status(200).json(data)
            client.close();

        }).catch((error) => console.log(error));

    })

});
app.put("/update/:id", async (req, res) => {
    try {
        let clientupd = await mongoClient.connect(url);
        let db = clientupd.db("dj_db");
        await db.collection("users").findOneAndUpdate({ _id: objectId(req.params.id) }, { $set: req.body });
        res.status(200).json({ message: "user updated" });
        clientupd.close();
    }
    catch (error) {
        console.log(error);
    }

});
app.delete("/delete/:id", async (req, res) => {
    try {
        let clientud = await mongoClient.connect(url);
        let db = clientud.db("dj_db");
        await db.collection("users").deleteOne({ _id: objectId(req.params.id) });
        res.status(200).json({ message: "one item deleted" });
        clientud.close();
    }
    catch (error) {
        console.log(error);
    }

});

app.listen(4000, () => console.log("4000 executed"));