// Mock data for the website

export const locations = [
  {
    id: 1,
    name: "Location A",
    address: "123 Main St, City A",
    issues: 5,
    score: { value: 90, label: "Gold" },
  },
  {
    id: 2,
    name: "Location B",
    address: "456 Elm St, City B",
    issues: 2,
    score: { value: 75, label: "Silver" },
  },
  {
    id: 3,
    name: "Location C",
    address: "789 Oak St, City C",
    issues: 0,
    score: { value: 55, label: "Bronze" },
  },
];

export const issues = [
  {
    id: 1,
    locationId: 1,
    title: "Broken Window",
    description: "A window is broken in the main hall.",
    severity: "High",
  },
  {
    id: 2,
    locationId: 1,
    title: "Leaking Roof",
    description: "There is a leak in the roof of the storage room.",
    severity: "Medium",
  },
  {
    id: 3,
    locationId: 2,
    title: "Faulty AC",
    description: "The air conditioning is not working.",
    severity: "Low",
  },
];