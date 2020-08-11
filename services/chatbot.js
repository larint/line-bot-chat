"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBot = void 0;
const bot_sdk_1 = require("@line/bot-sdk");
const builderMessage_1 = require("../helpers/builderMessage");
require('dotenv').config();
let client = new bot_sdk_1.Client({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
});
class ChatBot {
}
exports.ChatBot = ChatBot;
ChatBot.sendMessage = (token, message) => {
    return client.replyMessage(token, message);
};
ChatBot.handleMessageEvent = (event) => {
    console.log(event);
    let typeMessage = event.message.type;
    switch (typeMessage) {
        case 'text':
            return ChatBot.handleText(event);
        case 'image':
            return ChatBot.handleImage(event);
        case 'video':
            return ChatBot.handleVideo(event);
        case 'audio':
            return ChatBot.handleAudio(event);
        case 'location':
            return ChatBot.handleLocation(event);
        case 'sticker':
            return ChatBot.handleSticker(event);
        default:
            throw new Error(`Unknown message: ${JSON.stringify(event.message)}`);
    }
};
ChatBot.handleFollowEvent = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got followed event' });
};
ChatBot.handleUnfollowEvent = (event) => {
    console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
};
ChatBot.handleJoinEvent = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `Joined ${event.source.type}` });
};
ChatBot.handleLeaveEvent = (event) => {
    console.log(`Left: ${JSON.stringify(event)}`);
};
ChatBot.handlePostbackEvent = (event) => {
    let data = event.postback.data;
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `Got postback: ${data}` });
};
ChatBot.handleBeaconEvent = (event) => {
    const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}` });
};
ChatBot.handleText = async (event) => {
    let messageReceive = event.message.text.toLowerCase();
    let profile = await client.getProfile(event.source.userId).then((profile) => profile);
    let answer = await builderMessage_1.BuilderMessage.getAnswerBot(messageReceive, profile);
    return ChatBot.sendMessage(event.replyToken, {
        type: "text",
        text: answer
    });
};
ChatBot.handleImage = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Image' });
};
ChatBot.handleVideo = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Video' });
};
ChatBot.handleAudio = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Audio' });
};
ChatBot.handleLocation = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Location' });
};
ChatBot.handleSticker = (event) => {
    return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Sticker' });
};
