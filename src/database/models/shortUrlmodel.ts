import mongoose, { Document, Schema } from "mongoose";

export interface IShortUrl extends Document {
  originalUrl: string;
  slug: string;
  userId: mongoose.Types.ObjectId;
  visitHistory: Date[];
  createdAt: Date;
  updatedAt: Date;
}

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
      type: [Date],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite issues in dev with Next.js
const ShortUrl =
  mongoose.models.ShortUrl ||
  mongoose.model<IShortUrl>("ShortUrl", ShortUrlSchema);
export default ShortUrl;
