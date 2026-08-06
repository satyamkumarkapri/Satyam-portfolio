const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create the contacts table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Contacts table ready.');
            }
        });
    }
});

// API Endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    const params = [name, email, subject, message];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error inserting data', err.message);
            return res.status(500).json({ error: 'Failed to save message' });
        }
        res.status(201).json({
            message: 'Message stored successfully!',
            id: this.lastID
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
