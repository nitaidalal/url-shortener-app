import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.routes.js';
import { redirectToOriginal } from './controllers/url.controller.js';
import authRoutes from './routes/auth.routes.js';
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import analyticsRoutes from "./routes/analytics.routes.js";



dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ============== Built-in MIDDLEWARE ==============
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// ============== ROUTES ==============
app.use('/api/urls', urlRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Redirect route (We have to keep this at last because of the dynamic :code param)
app.get('/:code', redirectToOriginal);


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}🚀`);
    connectDB();
});
