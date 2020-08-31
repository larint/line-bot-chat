import * as fs from 'fs'
import * as path from 'path'

export function isExistFile(filePath: string) {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) { }
    return false;
}

export function round(num: number, pad: number = 10) {
    return Math.round(num * pad) / pad
}

export function log(msg: any, file: string = 'log.log') {
    let pathFile = path.join(path.dirname(__dirname), file)
    let stream = fs.createWriteStream(pathFile, { flags: 'a' })
    stream.write(msg + '\n');
}

export function getDateRangeLimitNow(fromDate: string | Date, addDate: number = 0, format: string = 'dd-MM-YYYY') {
    let dateNow = new Date()
    let yesterday = new Date(dateNow.setDate(dateNow.getDate() - 1))

    let start = (fromDate instanceof Date) ? fromDate : new Date(fromDate)
    let rangeDate = []
    for (let i = 0; i < addDate; i++) {
        if (start < yesterday) {
            let date = formatDate(format, start)
            let nextDate = start.setDate(start.getDate() + 1)
            start = new Date(nextDate)
            rangeDate.push(date)
        }
    }

    return rangeDate
}

// sub or add more date
// ex: +1, -2
export function formatDate(format: string = 'dd-MM-YYYY', dateObj: Date = new Date(), moreDate: number = 0): string {
    dateObj.setDate(dateObj.getDate() + moreDate)

    let year = dateObj.getFullYear()
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
    let date = ("0" + dateObj.getDate()).slice(-2)
    switch (format) {
        case 'dd-MM-YYYY':
            return `${date}${month}${year}`
        case 'YYYYMMDD':
            return `${year}${month}${date}`
        case 'MMDD':
            return `${month}${date}`
        case 'YYYY-MM-DD':
            return `${year}-${month}-${date}`
    }

    return dateObj.toDateString()
}

export function randomColorHex() {
    let cls = ["#626262", "#717171", "#818181", "#919191", "#a0a0a0", "#b0b0b0", "#c0c0c0", "#cfcfcf", "#dfdfdf", "#3b3b3b", "#484848", "#555555", "#6e6e6e", "#7b7b7b", "#888888", "#746053", "#68564a", "#5c4c42", "#51433a", "#453931", "#3a3029", "#2e2621", "#221c18", "#171310", "#0b0908", "#816f64", "#8f7f75", "#9d8f86", "#ab9f97", "#b9afa9", "#c7bfba", "#d5cfcb", "#e3dfdc", "#f1efed", "#7b4c47", "#885d59", "#956f6b", "#a2817e", "#af9390", "#bda5a3", "#cab7b5", "#d7c9c7", "#374053", "#4b5364", "#5e6675", "#737986", "#878c97", "#9b9fa9", "#afb2ba", "#c3c5cb", "#374053", "#31394a", "#2c3342", "#262c3a", "#283e46", "#3d5158", "#52646a", "#68777d", "#7e8b90", "#939ea2", "#a9b1b5", "#24373f", "#203138", "#1c2b31"]
    let idx = Math.floor(Math.random() * Math.floor(cls.length));

    return cls[idx]
}

export async function generateNumberProportion(max: number, segments: number) {
    let segmentMax: number = 60,
        tempResults: number[] = [],
        remaining: number = max,
        finalResults: number[] = []

    //create a series of random numbers and push them into an array
    for (let i = 1; i <= segments; i++) {
        let r: number = Math.random() * segmentMax
        r = Math.round(r * 10) / 10
        if (i === segments) {
            // the final segment is just what's left after the other randoms are added up
            r = remaining
        }
        tempResults.push(r)
        // subtract them from the total
        remaining -= r
        remaining = Math.round(remaining * 10) / 10
        // no segment can be larger than what's remaining
        segmentMax = remaining
    }

    //randomly shuffle the array into a new array
    while (tempResults.length > 0) {
        let index = Math.floor(Math.random() * tempResults.length)
        finalResults = finalResults.concat(tempResults.splice(index, 1));
    }
    return finalResults
}