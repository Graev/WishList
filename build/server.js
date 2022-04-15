"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var fs_1 = __importDefault(require("fs"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var router_1 = __importDefault(require("./router/router"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect("mongodb://127.0.0.1:27017/wish-list", {});
var swaggerFile = JSON.parse(fs_1.default.readFileSync("./output.json", { encoding: "utf-8" }));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 4000;
app.use((0, cors_1.default)("*"));
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerFile));
app.use("/", router_1.default);
app.listen(port, function () { return console.log("Running on port ".concat(port)); });
//# sourceMappingURL=server.js.map