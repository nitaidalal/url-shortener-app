import express from 'express';
import {
  createShortUrl,
  getAllUrls,
  getStats,
  deleteUrl,
} from '../controllers/url.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// POST /api/urls - Create short URL
router.post('/', authMiddleware, createShortUrl);

// GET /api/urls -  Get all URLs
router.get('/', authMiddleware, getAllUrls);

// GET /api/urls/:code/stats - Get stats for a short URL
router.get('/:code/stats', authMiddleware, getStats);

// DELETE /api/urls/:id - Delete a URL
router.delete('/:id', authMiddleware, deleteUrl);

export default router;
