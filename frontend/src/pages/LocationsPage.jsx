// src/pages/LocationsPage.jsx
import React, { useEffect, useState } from "react";
import { getLocations } from "../api.js";
import LocationCard from "../components/LocationCard.jsx";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data || []);
    } catch (err) {
      console.error("Failed to load locations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <div className="page">
      <h1>Accessible Locations</h1>
      <p className="muted">
        Browse locations with accessibility scores, powered by live audits & reports.
      </p>
      {loading ? (
        <div>Loading locations...</div>
      ) : locations.length === 0 ? (
        <div>No locations found.</div>
      ) : (
        <div className="grid">
          {locations.map((loc) => (
            <LocationCard key={loc._id} location={loc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
