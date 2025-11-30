// src/api.js
import axios from "axios";
import { locations, issues } from "./mockData";

const API_BASE_URL = "http://localhost:4000/api | https://aptiv-certification-system.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL
});

// attach token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getLocations = () => {
  return Promise.resolve(locations);
};

export const getLocationById = (id) => {
  return Promise.resolve(locations.find((location) => location.id === id));
};

export const getIssuesByLocationId = (locationId) => {
  return Promise.resolve(issues.filter((issue) => issue.locationId === locationId));
};
