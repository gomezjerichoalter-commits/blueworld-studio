const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const db = new sqlite3.Database('./blueworld.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to SQLite database.');
});

// Database Tables
db.run("CREATE TABLE IF NOT EXISTS global_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, currency TEXT DEFAULT 'USD', balance REAL DEFAULT 0.00, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS global_transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, amount REAL, type TEXT, status TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT)");
db.run("CREATE TABLE IF NOT EXISTS ai_credits (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT UNIQUE, credits REAL DEFAULT 0.00, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS agent_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, agent_type TEXT, prompt TEXT, status TEXT DEFAULT 'QUEUED', result TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS platform_fees (id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_id TEXT, fee_amount REAL, source_user TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, title TEXT, message TEXT, type TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS edge_cache (id INTEGER PRIMARY KEY AUTOINCREMENT, asset_key TEXT UNIQUE, region TEXT, payload TEXT, cached_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS fraud_flags (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, risk_score REAL, reason TEXT, status TEXT DEFAULT 'FLAGGED', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
db.run("CREATE TABLE IF NOT EXISTS webhook_subscriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, endpoint_url TEXT, event_type TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

// New Notes Table
db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, title TEXT, content TEXT, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

app.get('/api/status', (req, res) => {
    res.send("blueWORLD.NWO Advanced Infrastructure Server is Online!");
});

// Notes Endpoints
app.get('/api/notes/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all('SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC', [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/notes', (req, res) => {
    const { user_id, title, content } = req.body;
    if (!user_id || !title) {
        return res.status(400).json({ error: 'Missing user_id or title' });
    }
    db.run('INSERT INTO notes (user_id, title, content, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [user_id, title, content || ''], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, note_id: this.lastID, message: 'Note saved successfully' });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM notes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Note deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
