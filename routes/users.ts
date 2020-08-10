import * as express from 'express'

let router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {

	res.send('user');
});

export { router }
