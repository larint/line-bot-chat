import { Request, Response, } from 'express'
import { DB } from '../helpers/db'
import { writeToPath } from '@fast-csv/format';
import * as path from 'path'
import { formatDate } from '../helpers/helper'

class IndexController {

    static index = async (req: Request, res: Response) => {
        let graphicsAges = await DB.selectByParams({
            select: '*',
            table: 'friend_graphics__ages',
            set: '?',
            where: [1]
        })

        let graphicsApptypes = await DB.selectByParams({
            select: '*',
            table: 'friend_graphics__apptypes',
            set: '?',
            where: [1]
        })

        let graphicsAreas = await DB.selectByParams({
            select: '*',
            table: 'friend_graphics__areas_jp',
            set: '?',
            where: [1]
        })

        let graphicsGenders = await DB.selectByParams({
            select: '*',
            table: 'friend_graphics__genders',
            set: '?',
            where: [1]
        })

        let graphicsSubscriptions = await DB.selectByParams({
            select: '*',
            table: 'friend_graphics__subscriptions',
            set: '?',
            where: [1]
        })

        let messagesStatistics = await DB.selectByParams({
            select: '*',
            table: 'messages_statistic',
            set: '?',
            where: [1],
            order: 'date_update desc'
        })

        return res.render('index', {
            ages: graphicsAges,
            apptypes: graphicsApptypes,
            areas: graphicsAreas,
            genders: graphicsGenders,
            subscriptions: graphicsSubscriptions,
            messagesStatistics: messagesStatistics
        })

    }

    static downCsv = async (req: Request, res: Response) => {
        let currentDate = formatDate('YYYYMMDD')
        let data: any[] = []
        let filename: string = `${currentDate}.csv`

        switch (req.params.data) {
            case "1":
                filename = `${currentDate}_friend_graphics_ages.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__ages',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "2":
                filename = `${currentDate}_friend_graphics_apptypes.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__apptypes',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "3":
                filename = `${currentDate}_friend_graphics_areas.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__areas_jp',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "4":
                filename = `${currentDate}_friend_graphics_genders.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__genders',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "5":
                filename = `${currentDate}_friend_graphics_subscriptions.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__subscriptions',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "6":
                filename = `${currentDate}_messages_statistic.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'messages_statistic',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            default:
                break;
        }


        let file = path.join(path.dirname(__dirname), `/data_csv/${filename}`)

        writeToPath(file, data)
            .on('error', err => console.error(err))
            .on('finish', () => res.download(file));
    }
}

export { IndexController }