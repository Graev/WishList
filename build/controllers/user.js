"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = exports.login = void 0;
var user_1 = __importDefault(require("../models/user"));
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    user_1.default.findOne({ email: email, password: password })
        .lean()
        .then(function (result) {
        if (result) {
            res.status(400).send(result).end();
        }
        else {
            res.status(404).send({ message: "Not Found" }).end();
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: "DB Error" }).end();
        console.error("err", err);
    });
};
exports.login = login;
var registration = function (req, res) {
    console.log("req.body", req.body);
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password, phone = _a.phone, openAll = _a.openAll;
    user_1.default.create(req.body)
        .then(function (result) {
        if (result) {
            res.status(400).send(result).end();
        }
        else {
            res.status(404).send({ message: "Not Found" }).end();
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: "DB Error" }).end();
        console.error("err", err);
    });
};
exports.registration = registration;
//# sourceMappingURL=user.js.map