const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Cambia a tu usuario de MySQL
  password: 'Kevin_Sig0216',      // Cambia a tu contraseña de MySQL
  database: 'clienteapi'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cliente (
      idcliente INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL
    )
  `;
  
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table checked/created successfully');
  });
});

// API Test Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
// 1. Add client endpoint
app.post('/api/clients', (req, res) => {
  const { name, email, address } = req.body;

  // Validación de campos vacíos
  if (!name || !email || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Verificar si el email ya existe
  db.query('SELECT * FROM cliente WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.log('Error checking email:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      console.log('Email already exists:', email);
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Si el email no existe, insertar nuevo cliente
    const query = 'INSERT INTO cliente (name, email, address) VALUES (?, ?, ?)';
    db.query(query, [name, email, address], (err, result) => {
      if (err) {
        console.error('Error adding client:', err);
        return res.status(500).json({ error: 'Failed to add client' });
      }

      const newClient = {
        idcliente: result.insertId,
        name,
        email,
        address
      };

      res.status(201).json(newClient);
    });
  });
});

// 2. Get all clients endpoint
app.get('/api/clients', (req, res) => {
  const query = 'SELECT * FROM cliente';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching clients:', err);
      return res.status(500).json({ error: 'Failed to fetch clients' });
    }
    
    res.status(200).json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Try accessing http://localhost:${port}/`);
});