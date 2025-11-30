// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import LocationDetailPage from "./pages/LocationDetailPage.jsx";
import ReportIssuePage from "./pages/ReportIssuePage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div className="app-root">
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LocationsPage />} />
          <Route path="/locations/:id" element={<LocationDetailPage />} />
          <Route path="/locations/:id/report" element={<ReportIssuePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
