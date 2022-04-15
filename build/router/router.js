"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var event_1 = require("../controllers/event");
var main_1 = require("../controllers/main");
var user_1 = require("../controllers/user");
var wish_1 = require("../controllers/wish");
var auth_1 = __importDefault(require("../middlewares/auth"));
var router = (0, express_1.Router)();
router.use(auth_1.default);
router.post("/login", user_1.login);
router.post("/registration", user_1.registration);
router.get("/feed", main_1.getMainScreen);
router.get("/wishes", wish_1.getWishs);
router.get("/wishes/:id", wish_1.getWishById);
router.post("/wishes", wish_1.createWish);
router.get("/events", event_1.getEvents);
router.get("/events/:id", event_1.getEventById);
router.post("/events", event_1.createEvents);
exports.default = router;
//# sourceMappingURL=router.js.map