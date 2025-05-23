const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 6500;
const pg = require("pg");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!", token: "hello_world" });
});

const options = {
    key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost.pem"))
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log("Server+App Started on port: " + port);
});