const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'blueworld-split-system', 'client')));

app.get('/api/status', (req, res) => {
    res.json({ status: 'online', node: '7Q3Q9', author: 'Elisha Makoi Kutata' });
});

app.listen(PORT, () => {
    console.log(`Connection Server successfully running on http://localhost:${PORT}`);
});
