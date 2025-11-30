// src/pages/ReportIssuePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";

const ReportIssuePage = () => {
  const { id } = useParams(); // locationId
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [form, setForm] = useState({
    type: "ramp_blocked",
    severity: "medium",
    description: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/locations/${id}`)
      .then((res) => setLocation(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/issues", {
        locationId: id,
        type: form.type,
        severity: form.severity,
        description: form.description
      });
      navigate(`/locations/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit issue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h1>Report Accessibility Issue</h1>
      {location && <p className="muted">Location: {location.name}</p>}

      <form onSubmit={onSubmit} className="form">
        <label>
          Issue Type
          <select name="type" value={form.type} onChange={onChange}>
            <option value="ramp_blocked">Ramp Blocked</option>
            <option value="lift_not_working">Lift Not Working</option>
            <option value="braille_missing">Braille Missing</option>
            <option value="path_blocked">Pathway Obstructed</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Severity
          <select name="severity" value={form.severity} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssuePage;
