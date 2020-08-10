import * as puppeteer from 'puppeteer'

import { typeArea, typeDataCovid } from '../helpers/type'

class Crawler {

    static getDataCovid = async () => {

        return await new Promise(async (resolve, reject) => {
            try {

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto("https://ncov.moh.gov.vn/");

                let dataStatitics: string[] = await page.evaluate(() => {
                    let row: string[] = []
                    let statitics = document.querySelectorAll('div.box-tke')
                    statitics.forEach((item) => {
                        let items1 = item.querySelectorAll('span.font24');
                        items1.forEach((it) => {
                            row.push((it as HTMLElement).innerText)
                        })

                    });
                    return row;
                });

                let dataArea: typeArea[] = await page.evaluate(() => {
                    let row: typeArea[] = []
                    let areasStatitics = document.querySelectorAll('div#sailorTableArea')

                    areasStatitics.forEach((item1, idx) => {
                        if (idx == 0) {

                            let items2 = item1.querySelectorAll('tr');
                            items2.forEach((item2, idx) => {
                                let items3 = item2.querySelectorAll('td');
                                let tr: string[] = []
                                items3.forEach((item3) => {
                                    tr.push((item3 as HTMLElement).innerText)
                                })
                                row.push({
                                    city: tr[0],
                                    confirmed: tr[1],
                                    active: tr[2],
                                    recovered: tr[3],
                                    deaths: tr[4],
                                })
                            })
                        }

                    });
                    return row;
                });

                browser.close();

                let dataCovids: typeDataCovid = { vn: {}, tg: {}, areas: [] }

                dataCovids = {
                    vn: {
                        confirmed: dataStatitics[0],
                        active: dataStatitics[1],
                        recovered: dataStatitics[2],
                        deaths: dataStatitics[3],
                    },
                    tg: {
                        confirmed: dataStatitics[4],
                        active: dataStatitics[5],
                        recovered: dataStatitics[6],
                        deaths: dataStatitics[7],
                    },
                    areas: dataArea
                }

                return resolve(dataCovids);
            } catch (e) {
                return reject(e);
            }
        })
    }
}

export { Crawler }