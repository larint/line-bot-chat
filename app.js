"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
require('dotenv').config();
const LineSchedule_1 = require("./services/LineSchedule");
require("./helpers/db");
const index_1 = __importDefault(require("./routes/index"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const chart_1 = __importDefault(require("./routes/chart"));
const statistic_1 = __importDefault(require("./routes/statistic"));
const channel_1 = __importDefault(require("./routes/channel"));
const broadcast_1 = __importDefault(require("./routes/broadcast"));
const app = express_1.default();
let http = require("http").Server(app);
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
var appLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'app.log'), { flags: 'a' });
app.use(morgan_1.default('combined', { stream: appLogStream, skip: (req, res) => { return res.statusCode < 400; } }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(method_override_1.default('_method'));
app.use(express_session_1.default({ secret: "bjhbahsbdjabwdhjbwjdh", resave: true, saveUninitialized: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.site_url = process.env.URI_PATH;
    next();
});
app.use(/\/(app.js|package.json)/, (req, res, next) => {
    res.sendStatus(404);
});
app.use('/', index_1.default);
app.use('/webhook', webhook_1.default);
app.use('/chart', chart_1.default);
app.use('/statistic', statistic_1.default);
app.use('/channel', channel_1.default);
app.use('/broadcast', broadcast_1.default);
app.use((err, req, res, next) => {
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
});
node_schedule_1.default.scheduleJob('48 * * * *', function () {
    console.log('run scheduleJob ' + new Date());
    LineSchedule_1.LineSchedule.run();
});
LineSchedule_1.LineSchedule.run();
http.listen(process.env.PORT || 3000, () => console.log('listening @ 3000', new Date()));
