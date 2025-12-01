# Aptiv Certification System
<div align="left">
  <img src="https://github.com/akhilthirunalveli/Aptiv-Certification-System/blob/main/frontend/src/assets/Coverpage.png" alt="App Demo" width="920"/>
</div>
Aptiv Certification System is a full-stack web application designed to manage, audit, and certify the accessibility of various locations. The platform enables users to view accessibility scores, report issues, and allows administrators to manage audits and monitor accessibility compliance.

## Features

- **User Authentication**: Secure login and role-based access (user, operator, admin).
- **Location Management**: Browse, view, and audit accessible locations.
- **Dynamic Scoring**: Real-time accessibility scoring based on audits, issues, and features.
- **Issue Reporting**: Users can report accessibility issues for any location.
- **Admin Dashboard**: Admins can view all locations, manage audits, and oversee reported issues.
- **Responsive UI**: Modern, mobile-friendly interface using React and Vite.
- **Mock & Live Data**: Easily switch between local mock data and live backend API.

## Tech Stack

- **Frontend**: React, Vite, React Router, Axios, CSS (Nunito font)
- **Backend**: Node.js, Express.js, MongoDB
- **API**: RESTful endpoints for locations, audits, issues, and authentication

## Project Structure

```
Aptiv-Certification-System/
├── Backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── assets/
│       ├── components/
│       ├── context/
│       └── pages/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akhilthirunalveli/Aptiv-Certification-System.git
   cd Aptiv-Certification-System
   ```

2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   # or
   yarn install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   # or
   yarn install
   ```

### Running the Application

#### Start the Backend
```bash
cd Backend
npm start
```

#### Start the Frontend
```bash
cd frontend
npm run dev
```

- The frontend will be available at `http://localhost:5173` (Vite default)
- The backend API runs at `http://localhost:4000/api` or [Production API](https://aptiv-certification-system.onrender.com)

### Switching Between Mock and Live Data
- The frontend `src/api.js` can be configured to use either local mock data or the live backend API. Adjust the `API_BASE_URL` as needed.

## Usage
- **Login** as a user, operator, or admin.
- **Browse locations** and view accessibility scores.
- **Report issues** for any location.
- **Admins** can access the dashboard to manage audits and issues.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add: your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Commit Message Guidelines
- Use clear, descriptive messages (e.g., `Add: Implement audit scheduling feature`)
- Use tags like `Add`, `Fix`, `Refactor`, `Style`, `Chore`, `Docs`, `Test`
