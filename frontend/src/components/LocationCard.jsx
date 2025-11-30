// src/components/LocationCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const scoreLabelColor = (score) => {
  if (score >= 85) return "tag-gold";
  if (score >= 70) return "tag-silver";
  if (score >= 50) return "tag-bronze";
  return "tag-poor";
};

const LocationCard = ({ location }) => {
  const score = location.score?.value ?? 0;
  const label = location.score?.label ?? "Unknown";

  return (
    <div className="card">
      <div className="card-header">
        <h3>{location.name}</h3>
        <span className={`tag ${scoreLabelColor(score)}`}>
          {score}/100 &nbsp; {label}
        </span>
      </div>
      <div className="card-body">
        <p className="muted">{location.type}</p>
        <p className="muted">{location.address}</p>
        <div className="features-row">
          {location.features?.hasRamp && <span className="pill">Ramp</span>}
          {location.features?.hasLift && <span className="pill">Lift</span>}
          {location.features?.hasAccessibleRestroom && (
            <span className="pill">Accessible Restroom</span>
          )}
          {location.features?.hasBraille && <span className="pill">Braille</span>}
          {location.features?.hasTactilePath && (
            <span className="pill">Tactile Path</span>
          )}
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/locations/${location.id}`} className="btn-text">
          View details →
        </Link>
      </div>
    </div>
  );
};

export default LocationCard;
