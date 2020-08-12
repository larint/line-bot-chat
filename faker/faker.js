"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faker = void 0;
const fs = require("fs");
const path = require("path");
class Faker {
}
exports.Faker = Faker;
Faker.getFriendGraphics = async (location) => {
    let rawdata = fs.readFileSync(path.join(__dirname, `json/friend_graphics_${location}.json`));
    let data = JSON.parse(rawdata);
    return data;
};
