// src/routes/issueRoutes.js
import express from "express";
import Issue from "../models/Issue.js";
import Location from "../models/Location.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Create issue (any logged-in user)
router.post("/", requireAuth(), async (req, res) => {
  try {
    const { locationId, type, description, severity, rating } = req.body;

    const location = await Location.findById(locationId);
    if (!location) return res.status(404).json({ message: "Location not found" });

    const issue = await Issue.create({
      location: locationId,
      createdBy: req.user.id,
      type,
      description,
      severity,
      userRatingImpact: rating ? { rating } : undefined
    });

    // increment open issues metric
    location.metrics.openIssuesCount += 1;
    await location.save();

    res.status(201).json(issue);
  } catch (err) {
    console.error("Create issue error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// List issues for a location
router.get("/location/:locationId", requireAuth(["operator", "admin", "auditor"]), async (req, res) => {
  try {
    const issues = await Issue.find({ location: req.params.locationId })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update issue status (operator/admin)
router.patch("/:id", requireAuth(["operator", "admin"]), async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    const prevStatus = issue.status;
    issue.status = status || issue.status;
    await issue.save();

    // adjust open issue count if closing
    if (prevStatus !== "resolved" && status === "resolved") {
      const location = await Location.findById(issue.location);
      if (location && location.metrics.openIssuesCount > 0) {
        location.metrics.openIssuesCount -= 1;
        await location.save();
      }
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
