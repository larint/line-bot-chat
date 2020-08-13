import * as express from 'express'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as morgan from 'morgan'
import * as nodeSchedule from 'node-schedule'
import * as fs from 'fs'
import * as path from 'path'
import { LineSchedule } from './services/LineSchedule'
import './helpers/db'
import * as moment from 'moment'
// ROUTER
import { router as indexRouter } from './routes/index'
import { router as usersRouter } from './routes/users'
import { router as webhookRouter } from './routes/webhook'
import { router as crawlerRouter } from './routes/crawler'
import { router as testRouter } from './routes/test'

require('dotenv').config()

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var appLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' })
app.use(morgan('combined', { stream: appLogStream, skip: (req, res) => { return res.statusCode < 400 } }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "bjhbahsbdjabwdhjbwjdh", resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// pass user to all template
app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.site_url = process.env.URI_PATH
	next()
});

// catch 404 and forward to error handler
app.use(/\/(app.js|package.json)/, (req: Request, res: Response, next: NextFunction) => {
	res.sendStatus(404)
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhook', webhookRouter);
app.use('/crawler', crawlerRouter);
app.use('/test', testRouter);

// error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
	// set locals, only providing error in development
	// res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	// res.status(err.status || 500);
	res.render('error');
});

nodeSchedule.scheduleJob('1 * * * *', function () {
	LineSchedule.run()
});
// LineSchedule.run()
app.listen(process.env.PORT || 3000, () => console.log('listening @ 3000', new Date()))
