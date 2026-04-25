// models/url.model.js
import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  device: {
    type: String,
    enum: ["Mobile", "Desktop", "Tablet", "Unknown"],
    default: "Unknown",
  },
  source: {
    type: String,
    enum: ["WhatsApp", "Instagram", "Facebook", "Google", "Direct", "Other"],
    default: "Direct",
  },
});

const urlSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customAlias: {
      type: String,
      default: null,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clickHistory: [clickSchema],
    lastAccessed: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Auto-delete expired URLs
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = mongoose.model("Url", urlSchema);

export { Url };
