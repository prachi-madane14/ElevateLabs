const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// GET /books → return all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST /books → add new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id → update book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id → remove book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook[0]);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Book API! Use /books to get started.");
});

// Start server
app.listen(PORT, () => {
  console.log(`📚 Book API running at http://localhost:${PORT}`);
});
