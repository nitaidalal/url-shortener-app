import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import { Url } from '../models/url.model.js';
import User from '../models/user.model.js';

/**
 * Create a short URL
 * POST /api/urls
 */
const createShortUrl = async (req, res) => {
  const { originalUrl, customAlias, expiresInDays } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  

  // Validate URL
  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format. Include http:// or https://" });
  }

  try {
    let shortCode;

    if (customAlias) {
      // Check if alias is taken
      const existing = await Url.findOne({ shortCode: customAlias });
      if (existing) {
        return res.status(409).json({ error: 'Custom alias already in use. Try another.' });
      }
      shortCode = customAlias.toLowerCase().replace(/\s+/g, '-');
    } else {
      // Check if URL already shortened
      const existingUrl = await Url.findOne({ originalUrl, customAlias: null });
      if (existingUrl) {
        return res.status(200).json(existingUrl);
      }
      shortCode = nanoid(7);
    }

    // Handle expiry
    let expiresAt = null;
    if (expiresInDays && parseInt(expiresInDays) > 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));
    }

    const newUrl = new Url({
      user: user._id,
      originalUrl,
      shortCode,
      customAlias: customAlias || null,
      expiresAt,
    });

    await newUrl.save();

    // Store Url document reference in user's urls array (ObjectId)
    user.urls.push(newUrl._id);
    await user.save();

    return res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

/**
 * Get all URLs
 * GET /api/urls
 */
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
    return res.status(200).json(urls);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Get stats for a short URL
 * GET /api/urls/:code/stats
 */
const getStats = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code, user: req.user.id });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    return res.status(200).json(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Delete a URL
 * DELETE /api/urls/:id
 */
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    return res.status(200).json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Redirect to original URL
 * GET /:code
 * Public endpoint - anyone can access shortened links
 */

// Helper functions (add to url.controller.js)
const detectDevice = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) return "Mobile";
  if (/tablet|ipad/i.test(userAgent)) return "Tablet";
  if (/windows|mac|linux/i.test(userAgent)) return "Desktop";
  return "Unknown";
};

const detectSource = (referrer) => {
  if (!referrer) return "Direct";
  if (/whatsapp/i.test(referrer)) return "WhatsApp";
  if (/instagram/i.test(referrer)) return "Instagram";
  if (/facebook/i.test(referrer)) return "Facebook";
  if (/google/i.test(referrer)) return "Google";
  return "Other";
};
const redirectToOriginal = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortCode: code });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Check if URL has expired
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ error: "This link has expired" });
    }

    // Extract device and source from request headers
    const userAgent = req.headers["user-agent"] || "";
    const referrer = req.headers["referer"] || "";

    const device = detectDevice(userAgent);
    const source = detectSource(referrer);

    // Record click with metadata
    url.clickHistory.push({
      timestamp: new Date(),
      device,
      source,
    });

    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};



export {
  createShortUrl,
  getAllUrls,
  getStats,
  deleteUrl,
  redirectToOriginal,
};
