"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channel__account_1 = require("./tables/channel__account");
const channel__groups_js_1 = require("./tables/channel__groups.js");
const channel__groups_accounts_js_1 = require("./tables/channel__groups_accounts.js");
channel__account_1.TableChannelAccount.up();
channel__groups_js_1.TableChannelGroup.up();
channel__groups_accounts_js_1.TableChannelGroupAccount.up();
