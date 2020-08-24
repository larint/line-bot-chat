"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsAreasID = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsAreasID extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__areas_id';
        this.column = [];
        this.areaTrans = {
            "unknown": "unknown",
            "Bali": "bali",
            "Bandung": "bandung",
            "Banjarmasin": "banjarmasin",
            "Jabodetabek": "jabodetabek",
            "Makassar": "makassar",
            "Medan": "medan",
            "Palembang": "palembang",
            "Samarinda": "samarinda",
            "Semarang": "semarang",
            "Surabaya": "surabaya",
            "Yogyakarta": "yogyakarta",
            "Lainnya": "lainnya",
        };
    }
}
exports.FriendGraphicsAreasID = FriendGraphicsAreasID;
