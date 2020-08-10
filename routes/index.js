"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const node_fetch_1 = require("node-fetch");
let router = express.Router();
exports.router = router;
const bot_sdk_1 = require("@line/bot-sdk");
require('dotenv').config();
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new bot_sdk_1.Client(config);
router.get('/', async (req, res, next) => {
    let auth = 'https://access.line.me/oauth2/v2.1/authorize?scope=profile%20openid&response_type=code&state=VsLVpr5e7lm29hXKG4YKdX5zgXZgNxSp&redirect_uri=' + process.env.URI_PATH + '/webhook&client_id=' + process.env.LINE_LOGIN_ID;
    res.render('index', { title: 'Test', auth: auth });
}).post('/getFriendDemographics', async (req, res, next) => {
    let data = await client.getFriendDemographics();
    res.send(data);
}).get('/getStatistics/:date', async (req, res, next) => {
    let result = {};
    result.ReplyMessages = await client.getNumberOfSentReplyMessages(req.params.date);
    result.SentPushMessages = await client.getNumberOfSentPushMessages(req.params.date);
    result.SentMulticastMessages = await client.getNumberOfSentMulticastMessages(req.params.date);
    result.SentBroadcastMessages = await client.getNumberOfSentBroadcastMessages(req.params.date);
    result.MessageDeliveries = await client.getNumberOfMessageDeliveries(req.params.date);
    res.send(result);
}).post('/sendBroadcast', async (req, res, next) => {
    let result = {};
    let replyObj;
    replyObj = {
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
                                        "text": "122",
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
    };
    result.MessageAPIResponseBase = await client.broadcast(replyObj);
    res.send(result.MessageAPIResponseBase);
});
router.get('/webhook', async (req, res, next) => {
    let params = {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: `${process.env.URI_PATH}/webhook`,
        client_id: process.env.LINE_LOGIN_ID,
        client_secret: process.env.LINE_LOGIN_SECRET
    };
    let query = '';
    for (let key in params) {
        query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
    }
    query = query.substring(0, query.length - 1);
    let data = await node_fetch_1.default('https://api.line.me/oauth2/v2.1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: query
    });
    let token = await data.json();
    let data1 = await node_fetch_1.default('https://api.line.me/v2/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + token.access_token,
        },
    });
    let token1 = await data1.json();
    res.render('index', { user: token1 });
});
