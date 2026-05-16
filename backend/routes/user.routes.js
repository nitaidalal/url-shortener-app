import express from 'express'
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const authRouter = express.Router()

import { registerUser, loginUser, logoutUser, changePassword, updateProfile, deleteAccount, uploadProfilePic } from "../controllers/user.controller.js";

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.put("/change-password", authMiddleware, changePassword);
authRouter.put("/profile", authMiddleware, updateProfile);
authRouter.delete("/delete-account", authMiddleware, deleteAccount);
authRouter.post("/upload-profile-pic", authMiddleware, upload.single('profilePic'), uploadProfilePic);

export default authRouter; 