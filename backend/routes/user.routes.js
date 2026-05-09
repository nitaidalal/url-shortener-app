import express from 'express'
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router()

import { registerUser, loginUser, logoutUser,changePassword,updateProfile,deleteAccount } from "../controllers/user.controller.js";

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.put("/change-password", authMiddleware, changePassword);
authRouter.put("/profile", authMiddleware, updateProfile);
authRouter.delete("/delete-account", authMiddleware, deleteAccount);   

export default authRouter; 