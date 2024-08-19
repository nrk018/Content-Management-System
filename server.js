// server.js

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple file-based database
const postsFile = path.join(__dirname, "posts.json");

// Load posts
app.get("/api/posts", (req, res) => {
    fs.readFile(postsFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading posts" });
        }
        const posts = JSON.parse(data);
        res.json(posts);
    });
});

// Create new post
app.post("/api/posts", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    fs.readFile(postsFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading posts" });
        }
        const posts = JSON.parse(data);
        const newPost = { title, content };
        posts.push(newPost);

        fs.writeFile(postsFile, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error saving post" });
            }
            res.json({ success: true, post: newPost });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});