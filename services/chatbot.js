"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBot = void 0;
const bot_sdk_1 = require("@line/bot-sdk");
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
    let messageReceive = event.message.text;
    if (messageReceive == 'gia vang') {
        return ChatBot.sendMessage(event.replyToken, {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        });
    }
    if (messageReceive == 'covid') {
        return ChatBot.sendMessage(event.replyToken, {
            "type": "flex",
            "altText": "Q1. Which is the API to create chatbot?",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Covid19",
                                    "align": "center",
                                    "size": "xxl",
                                    "weight": "bold"
                                },
                                {
                                    "type": "text",
                                    "text": "Thống kê dịch Covid19 ở Việt Nam",
                                    "wrap": true,
                                    "weight": "bold",
                                    "margin": "lg"
                                }
                            ]
                        },
                        {
                            "type": "separator"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Ca nhiễm: ",
                                            "flex": 6,
                                            "weight": "bold",
                                            "color": "#666666"
                                        },
                                        {
                                            "type": "text",
                                            "text": 11,
                                            "size": "lg",
                                            "wrap": true,
                                            "flex": 4,
                                            "color": "#FF0000"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Đang điều trị: ",
                                            "flex": 6,
                                            "weight": "bold",
                                            "color": "#666666"
                                        },
                                        {
                                            "type": "text",
                                            "text": "123",
                                            "size": "lg",
                                            "wrap": true,
                                            "flex": 4,
                                            "color": "#FF0000"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Phục hồi:",
                                            "flex": 6,
                                            "weight": "bold",
                                            "color": "#666666"
                                        },
                                        {
                                            "type": "text",
                                            "text": "12312",
                                            "size": "lg",
                                            "wrap": true,
                                            "flex": 4,
                                            "color": "#FF0000"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Tử vong: ",
                                            "flex": 6,
                                            "weight": "bold",
                                            "color": "#666666"
                                        },
                                        {
                                            "type": "text",
                                            "text": "123213",
                                            "size": "lg",
                                            "wrap": true,
                                            "flex": 4,
                                            "color": "#FF0000"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "spacing": "sm",
                    "contents": [
                        {
                            type: 'button',
                            action: {
                                type: 'uri',
                                label: 'Bộ  Y Tế',
                                uri: 'https://ncov.moh.gov.vn/',
                            },
                        }
                    ]
                }
            }
        });
    }
    if (messageReceive == 'loc') {
        return ChatBot.sendMessage(event.replyToken, {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        });
    }
    if (messageReceive == 'button') {
        return ChatBot.sendMessage(event.replyToken, {
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.w3schools.com/images/colorpicker.gif",
                "imageAspectRatio": "rectangle",
                "imageSize": "cover",
                "imageBackgroundColor": "#FFFFFF",
                "title": "Menu",
                "text": "Please select",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                },
                "actions": [
                    {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=123"
                    },
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=123"
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    }
                ]
            }
        });
    }
    let profile = await client.getProfile(event.source.userId).then((profile) => {
        return profile;
    });
    return ChatBot.sendMessage(event.replyToken, {
        type: "text",
        text: `Chào bạn ${profile.displayName}`
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
