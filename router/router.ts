import { Router } from "express";
import { createEvents, getEventById, getEvents } from "../controllers/event";
import { getMainScreen } from "../controllers/main";
import { login, registration } from "../controllers/user";
import { createWish, getWishs, getWishById } from "../controllers/wish";
import auth from "../middlewares/auth";

const router: Router = Router();

router.use(auth);

router.post("/login", login);
router.post("/registration", registration);

router.get("/feed", getMainScreen);

router.get("/wishes", getWishs);
router.get("/wishes/:id", getWishById);
router.post("/wishes", createWish);

router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.post("/events", createEvents);

export default router;
