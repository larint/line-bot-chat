"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const helper_1 = require("../helpers/helper");
const chatbot_1 = require("../services/chatbot");
let router = express.Router();
exports.router = router;
router.get('/', (req, res) => {
    helper_1.log(JSON.stringify(req.headers));
    res.send('respond with a resource');
}).post('/', (req, res) => {
    helper_1.log(JSON.stringify(req.body.events));
    if (!Array.isArray(req.body.events)) {
        return res.status(500).end();
    }
    Promise.all(req.body.events.map((event) => {
        console.log('event', event);
        if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
            return;
        }
        return handleEvent(event);
    }))
        .then(() => res.end())
        .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});
let handleEvent = (event) => {
    let typeEvent = event.type;
    console.log(event);
    switch (typeEvent) {
        case 'message':
            return chatbot_1.ChatBot.handleMessageEvent(event);
        case 'follow':
            return chatbot_1.ChatBot.handleFollowEvent(event);
        case 'unfollow':
            return chatbot_1.ChatBot.handleUnfollowEvent(event);
        case 'join':
            return chatbot_1.ChatBot.handleJoinEvent(event);
        case 'leave':
            return chatbot_1.ChatBot.handleLeaveEvent(event);
        case 'postback':
            return chatbot_1.ChatBot.handlePostbackEvent(event);
        case 'beacon':
            return chatbot_1.ChatBot.handleBeaconEvent(event);
        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
};
