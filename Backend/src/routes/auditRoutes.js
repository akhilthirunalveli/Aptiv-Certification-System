// src/routes/auditRoutes.js
import express from "express";
import Audit from "../models/Audit.js";
import Location from "../models/Location.js";
import { requireAuth } from "../middleware/auth.js";
import { calculateLocationScore } from "../services/scoringService.js";

const router = express.Router();

// Schedule audit (operator/admin)
router.post("/schedule", requireAuth(["operator", "admin"]), async (req, res) => {
  try {
    const { locationId, scheduledFor, auditorId } = req.body;

    const location = await Location.findById(locationId);
    if (!location) return res.status(404).json({ message: "Location not found" });

    const audit = await Audit.create({
      location: locationId,
      auditor: auditorId,
      scheduledFor,
      status: "scheduled"
    });

    res.status(201).json(audit);
  } catch (err) {
    console.error("Schedule audit error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Complete audit (auditor)
router.patch("/:id/complete", requireAuth(["auditor", "admin"]), async (req, res) => {
  try {
    const { checklist, notes } = req.body;

    const audit = await Audit.findById(req.params.id);
    if (!audit) return res.status(404).json({ message: "Audit not found" });

    // simple structural score from checklist
    const checks = checklist || {};
    const items = [
      checks.rampCompliant,
      checks.liftOperational,
      checks.brailleSignage,
      checks.accessibleRestroom,
      checks.emergencyPlanForPwD
    ];
    const total = items.length;
    const positive = items.filter((v) => v).length;
    const structuralScore = total > 0 ? Math.round((positive / total) * 100) : 0;

    audit.checklist = checks;
    audit.notes = notes;
    audit.structuralScore = structuralScore;
    audit.status = "completed";
    audit.completedAt = new Date();
    await audit.save();

    // recalc location score
    const location = await Location.findById(audit.location);
    const newScore = await calculateLocationScore(location);
    location.score = {
      value: newScore.value,
      label: newScore.label,
      lastCalculatedAt: new Date()
    };
    await location.save();

    res.json({ audit, updatedLocationScore: location.score });
  } catch (err) {
    console.error("Complete audit error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// List audits for a location
router.get("/location/:locationId", requireAuth(["operator", "auditor", "admin"]), async (req, res) => {
  try {
    const audits = await Audit.find({ location: req.params.locationId })
      .populate("auditor", "name email")
      .sort({ scheduledFor: -1 });

    res.json(audits);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
