import * as express from "express"
import { Router, Request, Response, NextFunction } from "express"

import { log } from '../helpers/helper'
import { ChatBot } from '../services/chatbot'

import * as path from 'path'
import * as Types from "@line/bot-sdk/dist/types"

let router = express.Router();

// webhook callback
router.get('/', (req: Request, res: Response) => {
  log(JSON.stringify(req.headers))
  res.send('respond with a resource')
}).post('/', (req, res) => {

  log(JSON.stringify(req.headers))

  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end()
  }
  // handle events separately
  Promise.all(req.body.events.map((event: any) => {
    console.log('event', event)
    // check verify webhook event
    if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return
    }
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});



// callback function to handle a single event
let handleEvent = (event: any) => {
  // event include: Message, Follow, Un Follow, Join...
  let typeEvent = event.type
  // if event is Message
  switch (typeEvent) {
    case 'message':
      return ChatBot.handleMessageEvent(event)

    case 'follow':
      return ChatBot.handleFollowEvent(event)

    case 'unfollow':
      return ChatBot.handleUnfollowEvent(event)

    case 'join':
      return ChatBot.handleJoinEvent(event)

    case 'leave':
      return ChatBot.handleLeaveEvent(event);

    case 'postback':
      return ChatBot.handlePostbackEvent(event)

    case 'beacon':
      return ChatBot.handleBeaconEvent(event);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

export { router }
