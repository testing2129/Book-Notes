// Book Notes Web App - Express/Node.js
// Main server file

import express from 'express';
import { Pool } from 'pg';
import { marked } from 'marked';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = process.env.PORT || 3000; // Use environment port for deployment

// Use DATABASE_URL for cloud deployment (e.g., Render)
const connectionString = process.env.DATABASE_URL;
const pool = connectionString
  ? new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false } // required for Render's Postgres
  })
  : new Pool({
    user: process.env.PGUSER || 'reviewer',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'book_reviews',
    password: process.env.PGPASSWORD || 'password',
    port: process.env.PGPORT || 5432,
  });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Home page: list all books
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM books ORDER BY release_date DESC');
  const booksWithCovers = await Promise.all(result.rows.map(async (book) => {
    let coverUrl = null;
    try {
      // Search Open Library for the book by title and author
      const response = await axios.get('https://openlibrary.org/search.json', {
        params: { title: book.title, author: book.author, limit: 1 }
      });
      const doc = response.data.docs[0];
      if (doc && doc.cover_i) {
        coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        await pool.query(
          'UPDATE books SET cover_url = $1 WHERE id = $2',
          [coverUrl, book.id]
        );
      };
    } catch (err) {
      console.log(err);
      coverUrl = null;
    }
    return { ...book, coverUrl };
  }));
  res.render('index', { books: booksWithCovers, marked });
});

// Add book form
app.get('/add', (req, res) => {
  res.render('add');
});

// Add book POST
app.post('/add', async (req, res) => {
  const { title, author, release_date, review, rating, pages, impressions, notes } = req.body;
  await pool.query(
    'INSERT INTO books (title, author, release_date, review, rating, pages, impressions, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [title, author, release_date, review, rating, pages, impressions, notes]
  );
  res.redirect('/');
});

// Delete book
app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send('Invalid ID');
  }
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
  res.redirect('/');
});

// Edit book form
app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const book = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  if (!book.rows[0]) {
    return res.status(404).send('Book not found');
  }
  res.render('edit', { book: book.rows[0], marked });
});

// Edit book POST
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, release_date, review, rating, pages, impressions, notes } = req.body;
  await pool.query(
    'UPDATE books SET title = $1, author = $2, release_date = $3, review = $4, rating = $5, pages = $6, impressions = $7, notes = $8 WHERE id = $9',
    [title, author, release_date, review, rating, pages, impressions, notes, id]
  );
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
