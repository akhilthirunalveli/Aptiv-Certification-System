// src/services/scoringService.js
import Audit from "../models/Audit.js";
import Issue from "../models/Issue.js";

export const calculateLocationScore = async (location) => {
  const locationId = location._id;

  // 1) Latest audit (structural score)
  const latestAudit = await Audit.findOne({
    location: locationId,
    status: "completed"
  })
    .sort({ completedAt: -1 })
    .lean();

  const structuralScore = latestAudit?.structuralScore ?? 50; // default mid if no audit

  // 2) Issue penalty
  const openIssues = await Issue.find({ location: locationId, status: { $ne: "resolved" } });
  let issuePenalty = 0;

  openIssues.forEach((issue) => {
    if (issue.severity === "high") issuePenalty += 10;
    else if (issue.severity === "medium") issuePenalty += 5;
    else issuePenalty += 2;
  });

  // 3) User rating factor (optional)
  const avgUserRating = location.metrics?.avgUserRating || 0;
  const ratingBoost = avgUserRating > 0 ? (avgUserRating - 3) * 3 : 0; // small bonus/penalty

  // Weighted combination
  let score =
    0.6 * structuralScore + // 60% structural
    0.25 * Math.max(0, 100 - issuePenalty) + // 25% operational/issue impact
    0.15 * (50 + ratingBoost * 5); // 15% user sentiment, normalized

  score = Math.max(0, Math.min(100, Math.round(score)));

  // label
  let label = "Unknown";
  if (score >= 85) label = "Gold";
  else if (score >= 70) label = "Silver";
  else if (score >= 50) label = "Bronze";
  else label = "Needs Improvement";

  return { value: score, label };
};
