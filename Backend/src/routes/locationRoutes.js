// src/routes/locationRoutes.js
import express from "express";
import Location from "../models/Location.js";
import { calculateLocationScore } from "../services/scoringService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Create location (operator/admin)
router.post("/", requireAuth(["operator", "admin"]), async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    console.error("Create location error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// List locations (public)
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().lean();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get location by id
router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).lean();
    if (!location) return res.status(404).json({ message: "Not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Recalculate score (e.g., after audit or issue)
router.post("/:id/recalculate-score", requireAuth(["operator", "admin"]), async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "Not found" });

    const score = await calculateLocationScore(location);
    location.score = {
      value: score.value,
      label: score.label,
      lastCalculatedAt: new Date()
    };
    await location.save();

    res.json({ message: "Score updated", score: location.score });
  } catch (err) {
    console.error("Recalc score error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
