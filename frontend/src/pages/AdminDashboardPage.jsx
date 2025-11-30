// src/pages/AdminDashboardPage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api.js";

const AdminDashboardPage = () => {
  const [locations, setLocations] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [locRes, issueRes] = await Promise.all([
          api.get("/locations"),
          api.get("/issues/location/" + "") // optional filter by location later
        ]);
        setLocations(locRes.data || []);
        // issueRes will error because locationId is "", so for hackathon you can remove this
      } catch (err) {
        console.log("You can customize admin dashboard later.");
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <h1>Admin / Operator Dashboard</h1>
      <p className="muted">
        For the hackathon, you can show basic stats or leave this as a placeholder.
      </p>

      <h3>Locations Count</h3>
      <p>{locations.length}</p>

      <p className="muted">
        You can extend this page to:
        <br />– View all issues with filters
        <br />– Trigger recalc of scores
        <br />– Schedule audits
      </p>
    </div>
  );
};

export default AdminDashboardPage;
