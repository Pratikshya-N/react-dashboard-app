# Incident Monitoring Dashboard

A production-style React dashboard that simulates real-time incident tracking with filtering, sorting, and detailed views.

---
## Live Demo

https://react-dashboard-app-livid.vercel.app

## Features

- Incident listing with table view
- Search with debounce optimization
- Status-based filtering
- Sorting (date, severity)
- Pagination
- Click row → detailed drawer view
- Loading skeletons and error handling
- Clean, scalable architecture

---

## Tech Stack

- React.js (TypeScript)
- Material UI
- Vite
- Custom Hooks

---

## Key Highlights

- Implemented debounced search for performance optimization
- Built reusable component structure (Table, Filters, Drawer)
- Designed scalable folder architecture
- Simulated API with async handling
- Added UX improvements (loading states, empty states)

---

## Project Structure

src/
- components/
- pages/
- hooks/
- services/
- layouts/
- constants/

---

## Setup

```bash
npm install
npm run dev
