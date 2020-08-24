"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const nodeSchedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const socketio = require("socket.io");
const methodOverride = require("method-override");
require('dotenv').config();
const LineSchedule_1 = require("./services/LineSchedule");
require("./helpers/db");
const index_1 = require("./routes/index");
const webhook_1 = require("./routes/webhook");
const chart_1 = require("./routes/chart");
const statistic_1 = require("./routes/statistic");
const channel_1 = require("./routes/channel");
const app = express();
let http = require("http").Server(app);
let io = socketio(http);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var appLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
app.use(morgan('combined', { stream: appLogStream, skip: (req, res) => { return res.statusCode < 400; } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({ secret: "bjhbahsbdjabwdhjbwjdh", resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.site_url = process.env.URI_PATH;
    next();
});
app.use(/\/(app.js|package.json)/, (req, res, next) => {
    res.sendStatus(404);
});
app.use('/', index_1.router);
app.use('/webhook', webhook_1.router);
app.use('/chart', chart_1.router);
app.use('/statistic', statistic_1.router);
app.use('/channel', channel_1.router);
app.use((err, req, res, next) => {
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
});
nodeSchedule.scheduleJob('23 * * *', function () {
    console.log('run scheduleJob ' + new Date());
    LineSchedule_1.LineSchedule.run();
    io.emit('schedule_get_line_data', { message: 'Updated data from LINE success' });
});
io.on("connection", (socket) => {
    console.log('connected');
});
http.listen(process.env.PORT || 3000, () => console.log('listening @ 3000', new Date()));
