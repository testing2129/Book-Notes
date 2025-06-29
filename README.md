# Book Notes Web App

A Notion-inspired web app for collecting, reviewing, and summarizing your favorite books. Built with Node.js, Express, PostgreSQL, and EJS.

## Features
- Add, edit, and delete book reviews
- Notion-style UI with modern fonts and colors
- Markdown support for notes and impressions
- Fetches book covers from Open Library
- Responsive and mobile-friendly

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/testing2129/book-notes.git
   cd book-notes
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your PostgreSQL database and create a `books` table:
   ```sql
   CREATE TABLE books (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     author TEXT NOT NULL,
     release_date DATE,
     review TEXT,
     rating INTEGER,
     pages INTEGER,
     impressions TEXT,
     notes TEXT
   );
   ```
4. Configure your environment variables (optional, for deployment):
   - `PGUSER`, `PGHOST`, `PGDATABASE`, `PGPASSWORD`, `PGPORT`, `PORT`

### Running Locally
```sh
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

## Deployment
- Ready for Render, Railway, Fly.io, Heroku, or any Node.js host
- Set environment variables for your production database


---
Inspired by Notion and built by Gabriel Janvrin.
