import * as Types from "@line/bot-sdk/dist/types";

export interface typeArea {
	city?: string,
	confirmed?: string,
	active?: string,
	recovered?: string,
	deaths?: string,
}

export interface typeDataCovid {
	vn: {
		confirmed?: string,
		active?: string,
		recovered?: string,
		deaths?: string,
	},
	tg: {
		confirmed?: string,
		active?: string,
		recovered?: string,
		deaths?: string,
	},
	areas: typeArea[] | undefined
}

export interface messageStatistic {
	reply?: Types.NumberOfMessagesSentResponse,
	sentPush?: Types.NumberOfMessagesSentResponse,
	sentMulticast?: Types.NumberOfMessagesSentResponse,
	sentBroadcast?: Types.NumberOfMessagesSentResponse,
	messageDeliveries?: Types.NumberOfMessageDeliveries,
	messageAPIResponseBase?: Types.MessageAPIResponseBase
}

export interface token {
	access_token: string,
	token_type: string,
	refresh_token: string,
	expires_in: string,
	scope: string,
	id_token: string,
}

export interface dataChartPie {
	data: string,
	labels: string,
	bgcolor: string
}

export interface datasetChartLine {
	label: string,
	data: number[],
	borderColor: string,
	backgroundColor: string,
	fill: boolean,
	lineTension: number
}
export interface dataChartLine {
	datasets: string,
	labels: string,
	suggestedMin: number,
	suggestedMax: number
}

export interface dataChartLineItem {
	label: string,
	data: number[]
}

export interface ChannelConfig {
	name: string,
	access_token: string,
	secret: string
}