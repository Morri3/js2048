var express = require("express");
var app = express();

app.use(express.static("WeChat_2048")).listen(8080);