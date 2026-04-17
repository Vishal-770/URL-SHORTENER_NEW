import mongoose, { Document, Schema } from "mongoose";

export interface IVisitEntry {
  timestamp: Date;
  ip: string;
  deviceType: string;
  os: string;
  browser: string;
  
  referrer: string;
  userAgent: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  isBot?: boolean;
  language?: string;
  visitorId?: string;
  referringDomain?: string;
}

export interface IShortUrl extends Document {
  originalUrl: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  visitHistory: IVisitEntry[];
  createdAt: Date;
  qrCode: string;
  qrOptions?: any;
  updatedAt: Date;
}

const VisitEntrySchema = new Schema<IVisitEntry>(
  {
    timestamp: { type: Date, default: Date.now },
    ip: { type: String },
    deviceType: { type: String },
    os: { type: String },
    browser: { type: String },

    referrer: { type: String },
    userAgent: { type: String },
    country: { type: String },
    city: { type: String },
    region: { type: String },
    timezone: { type: String },
    isBot: { type: Boolean, default: false },
    language: { type: String },
    visitorId: { type: String },
    referringDomain: { type: String },
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
    qrOptions: {
      type: Schema.Types.Mixed,
      default: null,
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
