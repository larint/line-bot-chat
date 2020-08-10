import { MessageEvent, UnfollowEvent, FollowEvent, PostbackEvent, JoinEvent, LeaveEvent, BeaconEvent } from '@line/bot-sdk/dist/types'
import { Client } from "@line/bot-sdk"

require('dotenv').config()

// create LINE SDK client
let client = new Client({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.LINE_CHANNEL_SECRET as string
})

class ChatBot {

    static sendMessage = (token: string, message: any) => {
        // let texts = Array.isArray(text) ? text : [text];
        return client.replyMessage(
            token,
            message
        );
    };

    static handleMessageEvent = (event: MessageEvent) => {
        console.log(event)
        // include: Text, Image, Video, Audio, File, Location, Sticker
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
    }

    static handleFollowEvent = (event: FollowEvent) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got followed event' })
    }

    static handleUnfollowEvent = (event: UnfollowEvent) => {
        console.log(`Unfollowed this bot: ${JSON.stringify(event)}`)
    }

    static handleJoinEvent = (event: JoinEvent) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `Joined ${event.source.type}` })
    }

    static handleLeaveEvent = (event: LeaveEvent) => {
        console.log(`Left: ${JSON.stringify(event)}`)
    }

    static handlePostbackEvent = (event: PostbackEvent) => {
        let data = event.postback.data
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `Got postback: ${data}` })
    }

    static handleBeaconEvent = (event: BeaconEvent) => {
        const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}` })
    }

    static handleText = async (event: any) => {
        // {
        //     type: 'message',
        //     replyToken: '699b2da7a0194a6c88b452e70125e5a5',
        //     source: { userId: 'Ube48b84e1f512ddb7ce966b195eab55d', type: 'user' },
        //     timestamp: 1597032452575,
        //     mode: 'active',
        //     message: { type: 'text', id: '12472941802965', text: 'hello' }
        //  }
        let messageReceive = event.message.text
        if (messageReceive == 'gia vang') {
            // (async () => {
            //   const browser = await puppeteer.launch();
            //   const page = await browser.newPage();
            //   await page.goto('https://google.com');
            //   await page.pdf({ path: 'google.pdf' });

            //   await browser.close();
            // })();

            return ChatBot.sendMessage(event.replyToken, {
                "type": "location",
                "title": "my location",
                "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            });
        }
        if (messageReceive == 'covid') {
            // await Covid.getData().then((data) => data).catch(console.error);
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
    }

    static handleImage = (event: any) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Image' });
    }

    static handleVideo = (event: any) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Video' });
    }

    static handleAudio = (event: any) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Audio' });
    }

    static handleLocation = (event: any) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Location' });
    }

    static handleSticker = (event: any) => {
        return ChatBot.sendMessage(event.replyToken, { type: 'text', text: 'Got Sticker' });
    }

}

export { ChatBot }