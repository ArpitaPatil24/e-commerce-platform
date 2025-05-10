const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();
const multer = require('multer');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;


// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the uploads folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Routes

// API to handle product submission
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null; // Get the uploaded file name

  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, image]
    );
    res.status(201).json(result.rows[0]); // Respond with the newly created product
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product");
  }
});

// API to get all products
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// Simple keyword search
app.get('/api/products/search', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Search error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
