const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");

const createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;

if (!longUrl) {
    return res.status(400).json({
        message: "Long URL is required"
    });
}

try {
    const url = new URL(longUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return res.status(400).json({
            message: "Only HTTP and HTTPS URLs are allowed"
        });
    }
} catch (error) {
    return res.status(400).json({
        message: "Please enter a valid URL"
    });
}

const shortCode = generateCode();

        const newUrl = await Url.create({
            longUrl,
            shortCode
        });

        res.status(201).json({
            message: "URL shortened successfully",
            shortUrl: `http://localhost:5000/${shortCode}`,
            shortCode: newUrl.shortCode
        });

    } catch (error) {
       console.error("CREATE URL ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
const redirectToOriginalUrl = async (req, res) => {
    try {
        const { code } = req.params;

        const url = await Url.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.longUrl);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
const getUrlStats = async (req, res) => {
    try {
        const { code } = req.params;

        const url = await Url.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.json({
            shortCode: url.shortCode,
            longUrl: url.longUrl,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createShortUrl,
    redirectToOriginalUrl,
    getUrlStats
};