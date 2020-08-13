"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("message", function (message) {
        console.log(message);
    });
});
