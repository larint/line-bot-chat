import * as fs from 'fs'
import * as path from 'path'

export function log(msg: any, file: string = 'log.log') {
    fs.readFileSync(file, { encoding: 'utf-8', flag: 'w+' })
    fs.writeFile(file, msg + '\n', { encoding: 'utf-8', flag: 'w+' }, console.warn)
}

export function formatDate(format: string = 'dd-MM-YYYY', dateObj: Date = new Date()): string {
    let year = dateObj.getFullYear()
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
    let date = ("0" + (dateObj.getDate() + 1)).slice(-2)
    switch (format) {
        case 'dd-MM-YYYY':
            return `${date}${month}${year}`
        case 'YYYYMMDD':
            return `${year}${month}${date}`
    }

    return dateObj.toDateString()
}