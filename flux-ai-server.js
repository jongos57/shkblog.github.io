const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = "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";  // 🔹 Dummy API Key

app.post("/chatgpt", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error connecting to OpenAI API" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
