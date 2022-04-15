"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var swagger_autogen_1 = __importDefault(require("swagger-autogen"));
var mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
var wish_1 = __importDefault(require("./models/wish"));
var event_1 = __importDefault(require("./models/event"));
var user_1 = __importDefault(require("./models/user"));
var doc = {
    info: {
        title: "WishList API",
        description: "",
    },
    definitions: {
        Wish: (0, mongoose_to_swagger_1.default)(wish_1.default),
        Wishes: [
            {
                $ref: "#/definitions/Wish",
            },
        ],
        Event: (0, mongoose_to_swagger_1.default)(event_1.default),
        Events: [
            {
                $ref: "#/definitions/Event",
            },
        ],
        User: (0, mongoose_to_swagger_1.default)(user_1.default),
    },
    host: "178.128.193.140",
    schemes: ["http"],
};
var outputFile = (0, path_1.join)(__dirname, "output.json");
var endpointsFiles = [(0, path_1.join)(__dirname, "./router/router.ts")];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(function (_a) {
    var success = _a.success;
    console.log("Generated: ".concat(success));
});
//# sourceMappingURL=apiDoc.js.map