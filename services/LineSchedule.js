"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSchedule = void 0;
const bot_sdk_1 = require("@line/bot-sdk");
const helper_1 = require("../helpers/helper");
const db_1 = require("../helpers/db");
const friend_graphics__genders_1 = require("../migrations//tables/friend_graphics__genders");
const friend_graphics__ages_1 = require("../migrations//tables/friend_graphics__ages");
const friend_graphics__apptypes_1 = require("../migrations//tables/friend_graphics__apptypes");
const friend_graphics__subscriptions_1 = require("../migrations//tables/friend_graphics__subscriptions");
const friend_graphics__areas_1 = require("../migrations//tables/friend_graphics__areas");
require('dotenv').config();
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new bot_sdk_1.Client(config);
class LineSchedule {
}
exports.LineSchedule = LineSchedule;
LineSchedule.run = async () => {
    console.log('run getFriendDemographics ' + new Date());
    let friend = await client.getFriendDemographics();
    await LineSchedule.saveGraphicsGenders(friend);
    await LineSchedule.saveGraphicsAges(friend);
    await LineSchedule.saveGraphicsAppTypes(friend);
    await LineSchedule.saveGraphicsSubscription(friend);
    await LineSchedule.saveGraphicsAreas(friend);
    await LineSchedule.saveMessageStatistic();
};
LineSchedule.saveGraphicsGenders = async (friend) => {
    var _a, _b;
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'friend_graphics__genders',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let gendersWhere = ['date_update', currentDate];
    (_a = friend.genders) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        gendersWhere.push(item.gender);
        gendersWhere.push(item.percentage);
    });
    if (((_b = friend.genders) === null || _b === void 0 ? void 0 : _b.length) == 0) {
        friend_graphics__genders_1.TableFriendGraphicsGenders.column.slice(2).forEach((column, idx) => {
            gendersWhere.push(column);
            gendersWhere.push('0');
        });
    }
    await db_1.DB.insertItem({
        table: 'friend_graphics__genders',
        set: '?? = ?,?? = ?,?? = ?,?? = ?',
        where: gendersWhere
    });
};
LineSchedule.saveGraphicsAges = async (friend) => {
    var _a, _b;
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'friend_graphics__ages',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let agesWhere = ['date_update', currentDate];
    (_a = friend.ages) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        agesWhere.push(item.age);
        agesWhere.push(item.percentage);
    });
    if (((_b = friend.ages) === null || _b === void 0 ? void 0 : _b.length) == 0) {
        friend_graphics__ages_1.TableFriendGraphicsAges.column.slice(2).forEach((column, idx) => {
            agesWhere.push(column);
            agesWhere.push('0');
        });
    }
    await db_1.DB.insertItem({
        table: 'friend_graphics__ages',
        set: '?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?',
        where: agesWhere
    });
};
LineSchedule.saveGraphicsAppTypes = async (friend) => {
    var _a, _b;
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'friend_graphics__apptypes',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let appTypesWhere = ['date_update', currentDate];
    (_a = friend.appTypes) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        appTypesWhere.push(item.appType);
        appTypesWhere.push(item.percentage);
    });
    if (((_b = friend.appTypes) === null || _b === void 0 ? void 0 : _b.length) == 0) {
        friend_graphics__apptypes_1.TableFriendGraphicsApptypes.column.slice(2).forEach((column, idx) => {
            appTypesWhere.push(column);
            appTypesWhere.push('0');
        });
    }
    await db_1.DB.insertItem({
        table: 'friend_graphics__apptypes',
        set: '?? = ?,?? = ?,?? = ?,?? = ?',
        where: appTypesWhere
    });
};
LineSchedule.saveGraphicsSubscription = async (friend) => {
    var _a, _b;
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'friend_graphics__subscriptions',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let subscriptionWhere = ['date_update', currentDate];
    (_a = friend.subscriptionPeriods) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        subscriptionWhere.push(item.subscriptionPeriod);
        subscriptionWhere.push(item.percentage);
    });
    if (((_b = friend.subscriptionPeriods) === null || _b === void 0 ? void 0 : _b.length) == 0) {
        friend_graphics__subscriptions_1.TableFriendGraphicsSubscriptions.column.slice(2).forEach((column, idx) => {
            subscriptionWhere.push(column);
            subscriptionWhere.push('0');
        });
    }
    await db_1.DB.insertItem({
        table: 'friend_graphics__subscriptions',
        set: '?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?',
        where: subscriptionWhere
    });
};
LineSchedule.saveGraphicsAreas = async (friend) => {
    var _a, _b;
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'friend_graphics__areas',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let areasWhere = ['date_update', currentDate];
    let areaTrans = friend_graphics__areas_1.TableFriendGraphicsAreas.areaTrans;
    let set = '?? = ?,';
    (_a = friend.areas) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        areasWhere.push(areaTrans[item.area]);
        areasWhere.push(item.percentage);
        set += '?? = ?,';
    });
    let citys = Object.values(areaTrans);
    if (((_b = friend.areas) === null || _b === void 0 ? void 0 : _b.length) == 0) {
        citys.map((city) => {
            areasWhere.push(city);
            areasWhere.push('0');
        });
    }
    await db_1.DB.insertItem({
        table: 'friend_graphics__areas',
        set: set.slice(0, -1),
        where: areasWhere
    });
};
LineSchedule.saveMessageStatistic = async () => {
    let currentDate = '20200806';
    let exist = await db_1.DB.selectByParams({
        select: 'id',
        table: 'messages_statistic',
        set: '??=?',
        where: ['date_update', currentDate]
    });
    if (exist.length > 0) {
        return;
    }
    let result = {};
    result.reply = await client.getNumberOfSentReplyMessages(currentDate);
    result.sentPush = await client.getNumberOfSentPushMessages(currentDate);
    result.sentMulticast = await client.getNumberOfSentMulticastMessages(currentDate);
    result.sentBroadcast = await client.getNumberOfSentBroadcastMessages(currentDate);
    result.messageDeliveries = await client.getNumberOfMessageDeliveries(currentDate);
    await db_1.DB.insertItem({
        table: 'messages_statistic',
        set: '??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?',
        where: [
            'date_update', currentDate,
            'reply_status', result.reply.status,
            'reply_number',
            result.reply.success,
            'push_status', result.sentPush.status,
            'push_number',
            result.sentPush.success,
            'multicast_status', result.sentMulticast.status,
            'multicast_number',
            result.sentMulticast.success,
            'broadcast_status', result.sentBroadcast.status,
            'broadcast_number',
            result.sentBroadcast.success,
            'deliveries_status', result.messageDeliveries.status,
            'deliveries_broadcast', result.messageDeliveries.broadcast,
            'deliveries_targeting', result.messageDeliveries.targeting,
            'deliveries_auto_response', result.messageDeliveries.autoResponse,
            'deliveries_welcome_response', result.messageDeliveries.welcomeResponse,
            'deliveries_chat', result.messageDeliveries.chat,
            'deliveries_api_broadcast', result.messageDeliveries.apiBroadcast,
            'deliveries_api_push', result.messageDeliveries.apiPush,
            'deliveries_api_multicast', result.messageDeliveries.welcomeResponse,
            'deliveries_api_reply', result.messageDeliveries.apiReply,
        ]
    });
};
