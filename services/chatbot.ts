import { MessageEvent, UnfollowEvent, FollowEvent, PostbackEvent, JoinEvent, LeaveEvent, BeaconEvent } from '@line/bot-sdk/dist/types'
import { Client } from "@line/bot-sdk"
import * as types from "@line/bot-sdk/dist/types"
import { BuilderMessage as Builder, BotMessage } from "../helpers/builderMessage"

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
        let messageReceive = event.message.text.toLowerCase()

        let profile = await client.getProfile(event.source.userId).then((profile) => profile);

        let answer = await Builder.getAnswerBot(messageReceive, profile)

        return ChatBot.sendMessage(event.replyToken, {
            type: "text",
            text: answer
        })
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