import mongoose, { Document, Schema } from "mongoose";

export interface IVisitEntry {
  timestamp: Date;
  ip: string;
  deviceType: string;
  os: string;
  browser: string;
  location: string;
  referrer: string;
  userAgent: string;
}

export interface IShortUrl extends Document {
  originalUrl: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  visitHistory: IVisitEntry[];
  createdAt: Date;
  qrCode: string;
  updatedAt: Date;
}

const VisitEntrySchema = new Schema<IVisitEntry>(
  {
    timestamp: { type: Date, default: Date.now },
    ip: { type: String },
    deviceType: { type: String },
    os: { type: String },
    browser: { type: String },
    location: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
  },
  { _id: false }
);

const ShortUrlSchema = new Schema<IShortUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitHistory: {
      type: [VisitEntrySchema],
      default: [],
    },
    qrCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
const ShortUrl =
  mongoose.models.ShortUrl ||
  mongoose.model<IShortUrl>("ShortUrl", ShortUrlSchema);

export default ShortUrl;
