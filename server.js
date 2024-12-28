const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Replace with your OpenAI API Key
const OPENAI_API_KEY = 'YOUR_API_KEY';

app.post('/search', async (req, res) => {
    try {
        const userQuery = req.body.query;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userQuery }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to fetch data from OpenAI." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
