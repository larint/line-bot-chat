"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    constructor() {
        this.index = async (req, res) => {
            return res.render('homes/index');
        };
    }
}
exports.default = new HomeController;
