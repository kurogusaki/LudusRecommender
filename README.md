# Game Recommendation System

A web-based game recommendation and analytics platform that provides personalized recommendations, gameplay tracking, and interactive data visualization using data sourced from Google Sheets.

---

# Features

## Recommendation System
- Personalized game recommendations
- Similar games recommendation engine
- Weighted recommendation algorithm based on:
  - genre preferences
  - enjoyment correlation
  - rating patterns
  - difficulty preferences
  - tag similarity

---

## Game Tracking
- Game difficulty tracking
- Play status management
- Gameplay time tracking
- Personal notes and reviews

---

## Search & Discovery
- Advanced filtering
- Search functionality
- Sorting and categorization

---

## Analytics & Visualization
- Gaming statistics dashboard
- Genre analytics
- Interactive charts and visualizations

---

## User Experience
- Responsive UI
- Dark mode
- Detailed game pages
- Export functionality

---

## Data Integration
- Google Sheets API integration

---

# Tech Stack

| Technology | Purpose |
|---|---|
| React + Next.js | Frontend and API routes |
| Tailwind CSS | Styling |
| SQLite | Database |
| Prisma | ORM / Database management |
| Google Sheets API | External data source |

---

# Planned Architecture

```plaintext
Google Sheets
       ↓
Google Sheets API
       ↓
Next.js Backend/API
       ↓
SQLite Database
       ↓
Recommendation Engine
       ↓
Frontend Dashboard
```

---

# Future Improvements
- AI-assisted recommendations
- User authentication
- Multi-user profiles
- Recommendation feedback system
- Achievement tracking

---

# Development Goals
- Build a scalable recommendation engine
- Create an intuitive analytics dashboard
- Deliver a responsive and modern UI
- Maintain a lightweight and efficient architecture

---

# Installation

```bash
git clone <repository-url>
cd game-recommendation-system
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file in the root directory and configure the required environment variables.

```env
DATABASE_URL=""
GOOGLE_SHEETS_API_KEY=""
GOOGLE_SHEET_ID=""
```

---

# License

This project is intended for educational and personal development purposes.
