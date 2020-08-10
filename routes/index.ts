import * as express from 'express'
import { Router, Request, Response, NextFunction } from "express"
import * as lineTypes from "@line/bot-sdk/dist/types";
import fetch from 'node-fetch'

let router = express.Router()

import { Client } from '@line/bot-sdk'

require('dotenv').config()

interface messageDemographicsResult {
	ReplyMessages?: lineTypes.NumberOfMessagesSentResponse,
	SentPushMessages?: lineTypes.NumberOfMessagesSentResponse,
	SentMulticastMessages?: lineTypes.NumberOfMessagesSentResponse,
	SentBroadcastMessages?: lineTypes.NumberOfMessagesSentResponse,
	MessageDeliveries?: lineTypes.NumberOfMessageDeliveriesResponse,
	MessageAPIResponseBase?: lineTypes.MessageAPIResponseBase
}

interface token {
	access_token: string,
	token_type: string,
	refresh_token: string,
	expires_in: string,
	scope: string,
	id_token: string,
}

const config = {
	channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
	channelSecret: process.env.LINE_CHANNEL_SECRET as string
}

const client = new Client(config)

/* GET home page. */
router.get('/', async (req, res, next) => {
	let auth = 'https://access.line.me/oauth2/v2.1/authorize?scope=profile%20openid&response_type=code&state=VsLVpr5e7lm29hXKG4YKdX5zgXZgNxSp&redirect_uri=' + process.env.URI_PATH + '/webhook&client_id=' + process.env.LINE_LOGIN_ID

	res.render('index', { title: 'Test', auth: auth });
}).post('/getFriendDemographics', async (req, res, next) => {
	let data = await client.getFriendDemographics()
	res.send(data)
}).get('/getStatistics/:date', async (req, res, next) => {

	let result: messageDemographicsResult = {}

	result.ReplyMessages = await client.getNumberOfSentReplyMessages(req.params.date)
	result.SentPushMessages = await client.getNumberOfSentPushMessages(req.params.date)
	result.SentMulticastMessages = await client.getNumberOfSentMulticastMessages(req.params.date)
	result.SentBroadcastMessages = await client.getNumberOfSentBroadcastMessages(req.params.date)
	result.MessageDeliveries = await client.getNumberOfMessageDeliveries(req.params.date)

	res.send(result)
}).post('/sendBroadcast', async (req, res, next) => {
	let result: messageDemographicsResult = {}

	let replyObj: lineTypes.Message | lineTypes.Message[] | lineTypes.FlexBubble | lineTypes.FlexMessage
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
	}

	result.MessageAPIResponseBase = await client.broadcast(replyObj)

	// await client.getUserInteractionStatistics(result.MessageAPIResponseBase);
	// let id = 'x-line-request-id';

	res.send(result.MessageAPIResponseBase)
});

router.get('/webhook', async (req, res, next) => {
	let params: any = {
		grant_type: 'authorization_code',
		code: req.query.code,
		redirect_uri: `${process.env.URI_PATH}/webhook`,
		client_id: process.env.LINE_LOGIN_ID,
		client_secret: process.env.LINE_LOGIN_SECRET
	}

	let query = ''
	for (let key in params) {
		query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
	}
	query = query.substring(0, query.length - 1)

	let data = await fetch('https://api.line.me/oauth2/v2.1/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: query
	});


	let token = await data.json()

	let data1 = await fetch('https://api.line.me/v2/profile', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ` + token.access_token,
		},
	});

	let token1 = await data1.json()

	// await fetch('POST', 'https://api.line.me/oauth2/v2.1/token', options).getBody('utf8').then(JSON.parse)

	res.render('index', { user: token1 });
});

export { router }
