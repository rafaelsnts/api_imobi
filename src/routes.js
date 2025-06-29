import { Router } from "express";
import UserController from "./controllers/UserController.js";
import ImobiController from "./controllers/ImobiController.js";
import SessionController from "./controllers/SessionController.js";
import auth from "./middlewares/auth.js";
import multer from "multer";
import uploadConfig from "./middlewares/upload";
import MessageController from "./controllers/MessageController.js";

const upload = multer(uploadConfig);

const router = Router();

router.post("/creatusers", UserController.createUser);
router.get("/listusers", auth, UserController.findAllUsers);
router.get("/listusers/:id", auth, UserController.findUser);
router.post("/session", SessionController.createSession);
router.post(
  "/createimobi",
  upload.single("thumb"),
  ImobiController.createImobi,
);
router.get("/listimobi", ImobiController.findAllImobi);
router.get("/listimobi/:id", ImobiController.findImobi);
router.get("listimobi/:slug", ImobiController.findImobi);
router.get("/createmessage", MessageController.createMessage);
router.get("/listmessage/:id", MessageController.findMessage);
export default router;
