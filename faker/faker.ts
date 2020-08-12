import fetch from 'node-fetch'
import * as fs from 'fs'
import * as path from 'path'

class Faker {

    static getFriendGraphics = async (location: 'jp' | 'tw' | 'th' | 'id') => {
        let rawdata: any = fs.readFileSync(path.join(__dirname, `json/friend_graphics_${location}.json`))
        let data = JSON.parse(rawdata)

        return data
    }

}

export { Faker }