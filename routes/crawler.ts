import * as express from 'express'
import { Crawler } from '../services/crawler'
import { typeDataCovid } from '../helpers/type'

let router = express.Router();


router.get('/covid', async (req, res, next) => {
	let dataCovids = await Crawler.getDataCovid().then((data) => data as typeDataCovid).catch(console.error);

	res.send(dataCovids);
});


export { router }
