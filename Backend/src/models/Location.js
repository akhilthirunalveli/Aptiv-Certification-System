// src/models/Location.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["station", "hospital", "mall", "other"], default: "other" },
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    },

    // static / structural accessibility
    features: {
      hasRamp: { type: Boolean, default: false },
      hasLift: { type: Boolean, default: false },
      hasBraille: { type: Boolean, default: false },
      hasTactilePath: { type: Boolean, default: false },
      hasAccessibleRestroom: { type: Boolean, default: false }
    },

    // dynamic score
    score: {
      value: { type: Number, default: 0 }, // 0–100
      label: { type: String, default: "Unknown" }, // Gold/Silver/Bronze/…
      lastCalculatedAt: Date
    },

    // aggregated stats
    metrics: {
      avgUserRating: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
      openIssuesCount: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
