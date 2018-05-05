var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://localhost:8081")
    });



app.post('/processarformulario', function (req, res) {
    var url = "mongodb://localhost:27017/database"; 
    var response = {
        nome:req.body.nome,
        pontos:req.body.pontos
    };
    var aluno = {
        "nome": response.nome,
        "pontos": response.pontos
    }
    console.log(aluno);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("database");
        dbo.collection("usercollection").insertOne(aluno, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }); 
});

app.get ('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
    });
    
