import { DB } from '../helpers/db'
import { randomColorHex } from '../helpers/helper'
import { dataChartPie, dataChartLine, datasetChartLine, dataChartLineItem } from '../helpers/type'
import { ChannelGroups } from '../models/channel_groups'

class Chart {

    channelGroups: ChannelGroups

    constructor() {
        this.channelGroups = new ChannelGroups()
    }

    /**
     * Get friend data for a column chart
     */
    prepareDataStatisticFriend = async (groupId: number, startDate: string, endDate: string) => {

        let accounts = await this.channelGroups.getAccountStatisticBetweenDate(groupId, startDate, endDate)

        // build data for chart 
        let dataChart = [], seriesChart = []
        for (let account of accounts) {
            dataChart.push({
                category: account.name,
                friends: account.friends_date_range,
                target_reach: account.target_reach_date_range,
                block: account.block
            })
        }

        seriesChart = [{
            dataFields: 'friends', name: 'Friend'
        }, {
            dataFields: 'target_reach', name: 'Target Reach'
        }, {
            dataFields: 'block', name: 'Block'
        }]

        return { data: dataChart, series: seriesChart }
    }

    prepareDataStatisticMessage = async (groupId: number, startDate: string, endDate: string) => {

        let accounts = await this.channelGroups.getAccountStatisticBetweenDate(groupId, startDate, endDate)

        // build data for chart 1, chart 2
        let dataChart = [], seriesChart = []
        for (let account of accounts) {
            dataChart.push({
                category: account.name,
                deliveries_broadcast: account.total_deliveries_broadcast,
                delivery_count: account.delivery_count,
            })
        }

        seriesChart = [{
            dataFields: 'deliveries_broadcast', name: 'Total Broadcast'
        }, {
            dataFields: 'delivery_count', name: 'Delivery Count'
        }]

        return { data: dataChart, series: seriesChart }
    }

    prepareDataChartPieFromTable = async (table: string) => {
        let dataTable = await DB.selectBySql(`select * from ${table} order by id desc limit 1`, true, true)
        let dataChart: dataChartPie = { data: '', labels: '', bgcolor: '' }

        if (dataTable.length > 0) {

            let labels: string[] = dataTable[0]
            labels = labels.slice(2, dataTable[0].length)
            dataChart.labels = JSON.stringify(labels)
            let data: number[] = dataTable[1]
            data = data.slice(2, dataTable[0].length)
            dataChart.data = JSON.stringify(data)
            let bgcolor = []
            for (const it of data) {
                let color = randomColorHex()
                bgcolor.push(color)
            }

            dataChart.bgcolor = JSON.stringify(bgcolor)
        }

        return dataChart
    }
    prepareDataChartLineFromTable = async (table: string) => {
        let dataTable = await DB.selectBySql(`select * from ${table} order by date_update desc limit 10`, true)
        let dataChart: dataChartLine = { datasets: '', labels: '', suggestedMin: 0, suggestedMax: 0 }

        if (dataTable.length > 0) {
            let labels: string[] = []
            let datasets: datasetChartLine[] = []
            // reverse array by date increase
            dataTable.reverse()

            let datait1 = [], datait2 = [], datait3 = [], datait4 = [], datait5 = []
            for (const item of dataTable) {
                let date = item.date_update.substr(4, 2) + '/' + item.date_update.substr(6, 2)
                labels.push(date)
                datait1.push(item.reply_number)
                datait2.push(item.broadcast_number)
                datait3.push(item.multicast_number)
                datait4.push(item.deliveries_welcome_response)
                datait5.push(item.deliveries_api_reply)
            }

            let datasetItem: dataChartLineItem[] = []
            datasetItem.push({ label: 'reply number', data: datait1 })
            datasetItem.push({ label: 'broadcast number', data: datait2 })
            datasetItem.push({ label: 'multicast number', data: datait3 })
            datasetItem.push({ label: 'welcome response', data: datait4 })
            datasetItem.push({ label: 'api reply', data: datait5 })

            for (const it of datasetItem) {
                let color = randomColorHex()
                datasets.push({
                    label: it.label,
                    data: it.data,
                    borderColor: color,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    fill: false,
                    lineTension: 0
                })
            }

            dataChart.labels = JSON.stringify(labels)
            dataChart.datasets = JSON.stringify(datasets)
        }

        return dataChart
    }
}

export { Chart }