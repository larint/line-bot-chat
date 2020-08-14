"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAreaTW = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAreaTW {
}
exports.TableFriendGraphicsAreaTW = TableFriendGraphicsAreaTW;
TableFriendGraphicsAreaTW.table = 'friend_graphics__areas_tw';
TableFriendGraphicsAreaTW.column = [];
TableFriendGraphicsAreaTW.areaTrans = {
    "unknown": "unknown",
    "台北市": "taipei_city",
    "新北市": "new_taipei",
    "桃園市": "taoyuan_city",
    "台中市": "taichung",
    "台南市": "tainan_city",
    "高雄市": "kaohsiung",
    "基隆市": "keelung",
    "新竹市": "hsinchu_city",
    "嘉義市": "chiayi_city",
    "新竹縣": "hisnchu_county",
    "苗栗縣": "miaoli_county",
    "彰化縣": "changhua_county",
    "南投縣": "nantou_county",
    "雲林縣": "yunlin_county",
    "嘉義縣": "chiayi_county",
    "屏東縣": "pingtung_county",
    "宜蘭縣": "yilan_county",
    "花蓮縣": "hualien_county",
    "台東縣": "taitung_county",
    "澎湖縣": "penghu_county",
    "金門縣": "kinmen_county",
    "連江縣": "lianjiang_county",
};
TableFriendGraphicsAreaTW.up = () => {
    let migration = new migration_1.Migration();
    migration.drop(TableFriendGraphicsAreaTW.table);
    migration.create(TableFriendGraphicsAreaTW.table, (table) => {
        table.integer('id').unsigned().increment();
        table.string('date_update');
        let citys = Object.values(TableFriendGraphicsAreaTW.areaTrans);
        citys.map((city) => {
            table.float(city).default(0);
        });
    });
};
