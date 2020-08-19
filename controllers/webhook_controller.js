"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const helper_1 = require("../helpers/helper");
const chatbot_1 = require("../services/chatbot");
class WebhookController {
    constructor() {
        this.receiveEvent = (req, res) => {
            helper_1.log(JSON.stringify(req.body.events), 'event.log');
            if (!Array.isArray(req.body.events)) {
                return res.status(500).end();
            }
            Promise.all(req.body.events.map((event) => {
                console.log('event', event);
                if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
                    return;
                }
                return this.handleEvent(event);
            }))
                .then(() => res.end())
                .catch((err) => {
                console.error(err);
                res.status(500).end();
            });
        };
        this.handleEvent = (event) => {
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
    }
}
exports.WebhookController = WebhookController;
