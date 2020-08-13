import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();

let http = require("http").Server(app);

// http server.
let io = require("socket.io")(http);

io.on("connection", function (socket: any) {
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("message", function (message: any) {
        console.log(message);
    });
});
