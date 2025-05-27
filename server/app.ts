import express, { json, urlencoded } from "express";
import { createServer } from "https";
import { readFileSync } from "fs";
import cookieParser from "cookie-parser";
import { connectDB } from './db/db';
import dotenv from "dotenv";
import { config } from "./config";
import { Logging } from './shared/logger';
if (config.isDev) {
    Logging.setLevel(Logging.Level.FINER);
} // default is INFO
const now = new Date();
const app = express();
dotenv.config();;
const port = process.env.PORT || 6500;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send({ message: "Hello World!", token: "hello_world" });
});
const options = {
    key: readFileSync(process.env.SERV_SSL_KEY_PATH),
    cert: readFileSync(process.env.SERV_CERT_PATH)
};
connectDB();
const server = createServer(options, app);
server.listen(port, () => {
    Logging.warn("Server/App Started on port: " + port + ". Took " + (+new Date() - +now) + "ms");
});

