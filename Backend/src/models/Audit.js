// src/models/Audit.js
import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    auditor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    scheduledFor: { type: Date, required: true },
    completedAt: Date,

    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled"
    },

    checklist: {
      rampCompliant: { type: Boolean, default: false },
      liftOperational: { type: Boolean, default: false },
      brailleSignage: { type: Boolean, default: false },
      accessibleRestroom: { type: Boolean, default: false },
      emergencyPlanForPwD: { type: Boolean, default: false }
    },

    notes: String,

    structuralScore: { type: Number, default: 0 } // 0–100, from audit
  },
  { timestamps: true }
);

export default mongoose.model("Audit", auditSchema);
