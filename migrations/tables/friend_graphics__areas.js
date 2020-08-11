"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAreas = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAreas {
}
exports.TableFriendGraphicsAreas = TableFriendGraphicsAreas;
TableFriendGraphicsAreas.column = [];
TableFriendGraphicsAreas.areaTrans = {
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
    "bangkok": "bangkok",
    "pattaya": "pattaya",
    "northern": "northern",
    "central": "central",
    "southern": "southern",
    "eastern": "eastern",
    "northeastern": "northeastern",
    "western": "western",
    "bali": "bali",
    "bandung": "bandung",
    "banjarmasin": "banjarmasin",
    "jabodetabek": "jabodetabek",
    "makassar": "makassar",
    "medan": "medan",
    "palembang": "palembang",
    "samarinda": "samarinda",
    "semarang": "semarang",
    "surabaya": "surabaya",
    "yogyakarta": "yogyakarta",
    "lainnya": "lainnya",
};
TableFriendGraphicsAreas.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('friend_graphics__areas');
    migration.create('friend_graphics__areas', (table) => {
        table.integer('id').unsigned().increment();
        table.string('date_update');
        let citys = Object.values(TableFriendGraphicsAreas.areaTrans);
        citys.map((city) => {
            table.integer(city).default(0);
        });
    });
};
