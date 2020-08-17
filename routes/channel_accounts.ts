import * as express from 'express'
import { Request, Response, } from 'express'
import { ChannelConfig } from '../helpers/type'
import { DB } from '../helpers/db'

let router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let accounts = await DB.selectByParams({
        table: 'channel_accounts',
        where: [1],
        select: '*',
        set: '?'
    })
    console.log(accounts)
    res.render('channel_account', { accounts: accounts })
}).post('/add', async (req: Request, res: Response) => {
    let channelConfig: ChannelConfig = req.body

    if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {
        return res.render('channel_account', { error: 'Please enter all required fields', old_data: channelConfig })
    } else {

        let isAdded = await DB.insertItem({
            table: 'channel_accounts',
            where: ['name', channelConfig.name, 'access_token', channelConfig.access_token, 'secret', channelConfig.secret],
            set: '?? = ?,?? = ?,?? = ?'
        })

    }



    res.redirect('back')
})
export { router }