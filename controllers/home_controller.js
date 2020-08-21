"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
class HomeController {
    constructor() {
        this.index = async (req, res) => {
            return res.render('homes/index');
        };
    }
}
exports.HomeController = HomeController;
