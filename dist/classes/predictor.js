"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const spawn = require("child_process").spawn;
class Predictor {
    constructor() { }
    predictBreed(userId, files) {
        return new Promise((resolve, reject) => {
            if (files.length == 0) {
                resolve();
            }
            const pathUser = path_1.default.resolve(__dirname, "../uploads/", userId, "posts", files[0]);
            const pythonProcess = spawn("py", ["../predict.py", pathUser]);
            pythonProcess.stdout.on("data", (data) => {
                console.log(data.toString());
                resolve(1);
            });
        });
    }
}
exports.default = Predictor;
