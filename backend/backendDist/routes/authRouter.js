import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();
router.post("/auth", authController.loginUser);
export default router;
//# sourceMappingURL=authRouter.js.map