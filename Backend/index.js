import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors middleware

dotenv.config();

const app = express();
app.use(cors()); // Use cors middleware here
app.use(bodyParser.json());

// PostgreSQL connection setup
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect().catch(err => console.error('Connection error', err.stack));

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'User created', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change password route without token authentication
app.post('/changepassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 5);
        await db.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Placeholder route for the web page
app.get('/webpage', (req, res) => {
    res.json({ message: 'This is a protected web page' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend is running at http://localhost:${PORT}`);
});
