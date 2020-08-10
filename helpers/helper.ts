import * as fs from 'fs'
import * as path from 'path'

export function log(msg: any) {
    fs.readFileSync('log.log', { encoding: 'utf-8', flag: 'w+' })
    fs.writeFile('log.log', msg + '\n', { encoding: 'utf-8', flag: 'w+' }, console.warn)
}
