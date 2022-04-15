"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainScreen = void 0;
var wish_1 = __importDefault(require("../models/wish"));
var event_1 = __importDefault(require("../models/event"));
var getMainScreen = function (req, res) {
    var dbQueryData = {
        openAll: true,
    };
    if (req.query.region) {
        dbQueryData.region = req.query.region;
    }
    var dbQuery = [
        wish_1.default.find(dbQueryData).sort({ dateCreate: -1 }).limit(30).lean(),
    ];
    if (req.user)
        dbQuery.push(event_1.default.find({
            $or: [{ guests: { $in: req.user._id } }, { creator: req.user._id }],
        })
            .sort({ date: -1 })
            .lean());
    Promise.all(dbQuery)
        .then(function (result) {
        if (result[0].length) {
            var data = { list: result[0] };
            if (result[1].length) {
                data.upcomingEvents = result[1];
            }
            res.status(200).send(data).end();
        }
        else {
            res.status(400).send({ message: "No content" }).end();
        }
    })
        .catch(function (err) {
        console.error("err", err);
        res.status(500).send({ message: "DB Error" }).end();
    });
};
exports.getMainScreen = getMainScreen;
//# sourceMappingURL=main.js.map