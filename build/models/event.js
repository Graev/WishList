"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Event = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    date: { type: Date },
    wishs: [
        {
            type: "ObjectId",
            ref: "wish",
            description: "_id wish",
        },
    ],
    guests: [
        {
            type: "ObjectId",
            ref: "user",
            description: "_id user",
        },
    ],
    creator: {
        type: "ObjectId",
        ref: "user",
        description: "_id user",
        required: true,
    },
});
exports.default = mongoose_1.default.model("event", Event);
//# sourceMappingURL=event.js.map