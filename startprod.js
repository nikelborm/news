const express = require('express');
const favicon = require('express-favicon');
const MongoClient = require("mongodb").MongoClient;
const path = require('path');

const port = process.env.PORT || 8080;
const mongoLink = process.env.MONGODB_URI || "mongodb://myUserAdmin:0000@localhost:27017/admin"
console.log(process.env.MONGODB_URI);

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
        if (err) return console.log(err);
        const db = client.db();
        const collection = db.collection("news");

        collection.find().toArray(function (err, results) {
            response.send(JSON.stringify(results));
        });
        client.close();
    });
});
app.post("/send", function (request, response) {
    const data = request.body;
    mongoClient.connect(function (err, client) {
        if (err) return console.log(err);
        const db = client.db();
        const collection = db.collection("news");

        collection.insertOne(data, function (err, result) {
            if (err) return console.log(err);
            response.send(JSON.stringify(result));
        });
        client.close();
    });
});
app.listen(port);