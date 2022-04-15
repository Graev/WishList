"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Wish = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    desc: String,
    img: String,
    link: String,
    price: String,
    creator: {
        type: "ObjectId",
        ref: "user",
        description: "_id user",
        required: true,
    },
    openAll: Boolean,
    openFor: [
        {
            type: "ObjectId",
            ref: "user",
            description: "_id user",
        },
    ],
    category: [
        {
            type: "ObjectId",
            ref: "category",
            description: "_id category",
        },
    ],
    region: String,
    dateCreate: { type: Date, default: function () { return new Date(); } },
});
exports.default = mongoose_1.default.model("wish", Wish);
//# sourceMappingURL=wish.js.map