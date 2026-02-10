const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configuration
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper Functions
const getFibonacci = (n) => {
    let series = [0, 1];
    for (let i = 2; i < n; i++) series.push(series[i - 1] + series[i - 2]);
    return n <= 0 ? [] : series.slice(0, n);
};

const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
    return num > 1;
};

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const findHCF = (arr) => arr.reduce((a, b) => gcd(a, b));
const findLCM = (arr) => arr.reduce((a, b) => (a * b) / gcd(a, b));

// GET /health
app.get('/health', (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
});

// POST /bfhl
app.post('/bfhl', async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        if (keys.length !== 1) return res.status(400).json({ is_success: false, message: "Exactly one key required" });

        const key = keys[0];
        const input = req.body[key];
        let data;

        switch (key) {
            case 'fibonacci': 
                data = getFibonacci(input); 
                break;
            case 'prime': 
                data = input.filter(isPrime); 
                break;
            case 'hcf': 
                data = findHCF(input); 
                break;
            case 'lcm': 
                data = findLCM(input); 
                break;
            case 'AI': 
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const result = await model.generateContent(`Answer in one word: ${input}`);
                data = result.response.text().trim();
                break;
            default: 
                return res.status(400).json({ is_success: false, message: "Invalid key" });
        }

        res.status(200).json({ is_success: true, official_email: OFFICIAL_EMAIL, data });
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
