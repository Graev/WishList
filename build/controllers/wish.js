"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishById = exports.createWish = exports.getWishs = void 0;
var wish_1 = __importDefault(require("../models/wish"));
var getWishs = function (req, res) {
    if (req.user)
        wish_1.default.find({ creator: req.user._id })
            .sort({ dateCreate: -1 })
            .limit(30)
            .lean()
            .then(function (result) {
            if (result.length) {
                res.status(200).send({ list: result }).end();
            }
            else {
                res.status(400).send({ message: "No content" }).end();
            }
        })
            .catch(function (err) {
            res.status(500).send({ message: "DB Error" }).end();
            console.error("err", err);
        });
    else
        res.status(401).send({ message: "Auth error" }).end();
};
exports.getWishs = getWishs;
var getWishById = function (req, res) {
    wish_1.default.find({ _id: req.query._id })
        .lean()
        .then(function (result) {
        if (result) {
            res.status(200).send(result).end();
        }
        else {
            res.status(400).send({ message: "No content" }).end();
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: "DB Error" }).end();
        console.error("err", err);
    });
};
exports.getWishById = getWishById;
var createWish = function (req, res) {
    if (req.user)
        wish_1.default.create(__assign(__assign({}, req.body), { creator: req.user._id }))
            .then(function (result) {
            if (result.length) {
                res.status(200).send({ list: result }).end();
            }
            else {
                res.status(400).send({ message: "No content" }).end();
            }
        })
            .catch(function (err) {
            res.status(500).send({ message: "DB Error" }).end();
            console.error("err", err);
        });
    else
        res.status(401).send({ message: "Auth error" }).end();
};
exports.createWish = createWish;
//# sourceMappingURL=wish.js.map