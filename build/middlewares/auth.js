"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_TOKEN = process.env.JWT_TOKEN;
exports.default = (function (req, res, next) {
    var playload;
    try {
        playload = jsonwebtoken_1.default.verify(req.cookies.jwt, JWT_TOKEN);
        req.user = playload;
        next();
    }
    catch (err) {
        next();
    }
});
//# sourceMappingURL=auth.js.map