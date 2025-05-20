const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 6500;

const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

const options = {
    key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost.pem"))
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log("Server+App Started on port: " + port);
});