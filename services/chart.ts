import { DB } from '../helpers/db'
import { randomColorHex } from '../helpers/helper'
import { dataChartPie } from '../helpers/type'

class Chart {

    static prepareDataChartPieFromTable = async (table: string) => {
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

}

export { Chart }