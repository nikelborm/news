const express = require('express')
const app = express()
const fs = require("fs");
// const jsonParser = express.json();
app.post("/load", function (request, response) {
    var fileContent = fs.readFileSync("newsData.json", "utf8");
    console.log(fileContent);
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    response.send(fileContent); // отправляем пришедший ответ обратно
});
app.post("/send", function (request, response) {
    {id, author, text, bigText} = req.body;
    var newMsg = { id, author, text, bigText };
    var fileContent = JSON.parse(fs.readFileSync("newsData.json", "utf8")).concat(newMsg);
    fs.writeFileSync("newsData.json",fileContent);
});
app.listen(2000);
