const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const fs = require("fs");
const port = process.env.PORT || 8080;

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
    var fileContent = fs.readFileSync("newsData.json", "utf8");
    response.send(fileContent);
});
app.post("/send", function (request, response) {
    const data = request.body;
    const newMsg = { id:data.id, author:data.author, text:data.text, bigText:data.bigText };
    // const fileContent = JSON.stringify(JSON.parse(fs.readFileSync("newsData.json", "utf8")).concat(newMsg));
    const fileContent = JSON.stringify(newMsg.concat(JSON.parse(fs.readFileSync("newsData.json", "utf8"))));
    console.log(fileContent);
    fs.writeFileSync("newsData.json",fileContent);
    response.send(fileContent);
});
app.listen(port);