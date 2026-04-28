import express from 'express'

const authRouter = express.Router()

import { registerUser, loginUser, logoutUser,changePassword,updateProfile,deleteAccount } from "../controllers/user.controller.js";

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.put("/password", changePassword);
authRouter.put("/profile", updateProfile);
authRouter.delete("/account", deleteAccount);   

export default authRouter; 