# Hot or Not Leads 🔥

A delightfully retro SaaS lead rating app inspired by the iconic Hot or Not website from 2002. Rate your sales leads from 1 (NOT) to 10 (HOT) and see how they stack up on the leaderboard.

## Purpose

This app serves as a **non-instrumented, vibe-coded starting point** for demonstrating:

- **PostHog Wizard** - Add product analytics, feature flags, session replay, and more
- **PostHog MCP** - Interact with PostHog via Claude and the Model Context Protocol

The codebase is intentionally simple and free of any analytics or tracking, making it a clean slate for showcasing PostHog integration workflows.

**This is not production ready code, this is for demo purposes only**

## Features

- **Lead Rating** - Score leads 1-10 with a classic Hot or Not interface
- **Leaderboard** - View all leads ranked by average hotness score
- **Retro 2002 Aesthetic** - Beveled buttons, gradients, marquee text, visitor counters
- **Dummy Data** - 12 sample SaaS leads ready to rate

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Data**: JSON file storage

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

This starts both the backend (port 3001) and frontend (port 5173) concurrently.

Open http://localhost:5173 in your browser.

## Project Structure

```
hot-or-not-leads/
├── backend/
│   ├── server.cjs         # Express API server
│   └── data/
│       └── leads.json     # Lead data storage
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # 2002-era styling
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Base styles
│   └── index.html
├── vite.config.js
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads |
| GET | `/api/leads/:id` | Get a single lead |
| GET | `/api/leads/random/next` | Get a random unrated lead |
| POST | `/api/leads/:id/rate` | Rate a lead (body: `{ rating: 1-10 }`) |
| GET | `/api/leaderboard` | Get leads sorted by rating |
| POST | `/api/reset` | Reset all ratings |

## Demo Workflow

1. Run the app without any instrumentation
2. Use PostHog Wizard or MCP to add tracking
3. Explore events, session replays, and analytics in PostHog

---

*Best viewed in Internet Explorer 6.0* 😉
