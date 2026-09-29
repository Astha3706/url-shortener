const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});
const connectDB = require("./config/db");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "URL Shortener API is running"
    });
});

const urlRoutes = require("./routes/urlRoutes");
const { redirectToOriginalUrl } = require("./controllers/urlController");

app.use("/api/urls", urlRoutes);
app.get("/:code", redirectToOriginalUrl);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});