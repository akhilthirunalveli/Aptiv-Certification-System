// src/models/Issue.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    type: {
      type: String,
      enum: ["ramp_blocked", "lift_not_working", "braille_missing", "path_blocked", "other"],
      required: true
    },

    description: String,
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open"
    },

    attachments: [
      {
        url: String,
        caption: String
      }
    ],

    userRatingImpact: {
      // optional rating user gives with issue (1-5)
      rating: { type: Number, min: 1, max: 5 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
