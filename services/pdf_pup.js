"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class PDF {
}
exports.PDF = PDF;
PDF.capturePdf = async (pathHtml) => {
    console.log('Starting: Generating PDF Process, Kindly wait ..');
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(pathHtml, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
        format: 'A4',
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        },
        printBackground: true,
        landscape: true
    });
    await browser.close();
    console.log('Ending: Generating PDF Process');
    return pdf;
};
