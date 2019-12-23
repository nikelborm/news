const express = require('express');
const favicon = require('express-favicon');
const MongoClient = require("mongodb").MongoClient;
const path = require('path');
// const fs = require("fs");

const port = process.env.PORT || 8080;
const mongoLink = process.env.MONGODB_URI || "mongodb://myUserAdmin:0000@localhost"

const mongoClient = new MongoClient(mongoLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.json());
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// const jsonParser = express.json();
app.post("/load", function (request, response) {
    mongoClient.connect(function (err, client) {
        const db = client.db();
        const collection = db.collection("news");
        if (err) return console.log(err);

        collection.find().toArray(function (err, results) {
            response.send(results);
            // response.send(fs.readFileSync("newsData.json", "utf8"));
        });
        client.close();
    });
});
app.post("/send", function (request, response) {
    const data = request.body;
    const newMsg = {
        id: data.id,
        author: data.author,
        text: data.text,
        bigText: data.bigText
    };
    mongoClient.connect(function (err, client) {
        if (err) return console.log(err);

        const db = client.db();
        const collection = db.collection("news");
        collection.insertOne(newMsg, function (err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                response.send(err);
            } else {
                response.send(result);
            }
        });
        client.close();
    });
    // const parsed = JSON.parse(fs.readFileSync("newsData.json", "utf8"));
    // const fileContent = JSON.stringify([].concat(newMsg).concat(parsed));
    // const fileContent = JSON.stringify(parsed.concat(newMsg));
});
app.listen(port);