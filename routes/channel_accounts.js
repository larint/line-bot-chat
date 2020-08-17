"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const db_1 = require("../helpers/db");
let router = express.Router();
exports.router = router;
router.get('/', async (req, res) => {
    let accounts = await db_1.DB.selectByParams({
        table: 'channel_accounts',
        where: [1],
        select: '*',
        set: '?'
    });
    console.log(accounts);
    res.render('channel_account', { accounts: accounts });
}).post('/add', async (req, res) => {
    let channelConfig = req.body;
    if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {
        return res.render('channel_account', { error: 'Please enter all required fields', old_data: channelConfig });
    }
    else {
        let isAdded = await db_1.DB.insertItem({
            table: 'channel_accounts',
            where: ['name', channelConfig.name, 'access_token', channelConfig.access_token, 'secret', channelConfig.secret],
            set: '?? = ?,?? = ?,?? = ?'
        });
    }
    res.redirect('back');
});
