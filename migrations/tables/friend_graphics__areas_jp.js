"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAreaJP = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAreaJP {
}
exports.TableFriendGraphicsAreaJP = TableFriendGraphicsAreaJP;
TableFriendGraphicsAreaJP.table = 'friend_graphics__areas_jp';
TableFriendGraphicsAreaJP.column = [];
TableFriendGraphicsAreaJP.areaTrans = {
    "unknown": "unknown",
    "北海道": "hokkaido",
    "青森": "aomori",
    "岩手": "iwate",
    "宮城": "miyagi",
    "秋田": "akita",
    "山形": "yamagata",
    "福島": "fukushima",
    "茨城": "ibaraki",
    "栃木": "tochigi",
    "群馬": "gunma",
    "埼玉": "saitama",
    "千葉": "chiba",
    "東京": "tokyo",
    "神奈川": "kanagawa",
    "新潟": "niigata",
    "富山": "toyama",
    "石川": "ishikawa",
    "福井": "fukui",
    "山梨": "yamanashi",
    "長野": "nagano",
    "岐阜": "gifu",
    "静岡": "shizuoka",
    "愛知": "aichi",
    "三重": "mie",
    "滋賀": "shiga",
    "京都": "kyoto",
    "大阪": "osaka",
    "兵庫": "hyogo",
    "奈良": "nara",
    "和歌山": "wakayama",
    "鳥取": "tottori",
    "島根": "shimane",
    "岡山": "okayama",
    "広島": "hiroshima",
    "山口": "yamaguchi",
    "徳島": "tokushima",
    "香川": "kagawa",
    "愛媛": "ehime",
    "高知": "kochi",
    "福岡": "fukuoka",
    "佐賀": "saga",
    "長崎": "nagasaki",
    "熊本": "kumamoto",
    "大分": "oita",
    "宮崎": "miyazaki",
    "鹿児島": "kagoshima",
    "沖縄": "okinawa",
};
TableFriendGraphicsAreaJP.up = () => {
    let migration = new migration_1.Migration();
    migration.drop(TableFriendGraphicsAreaJP.table);
    migration.create(TableFriendGraphicsAreaJP.table, (table) => {
        table.integer('id').unsigned().increment();
        table.integer('account_id');
        table.string('date_update');
        let citys = Object.values(TableFriendGraphicsAreaJP.areaTrans);
        citys.map((city) => {
            table.float(city).default(0);
        });
    });
};
