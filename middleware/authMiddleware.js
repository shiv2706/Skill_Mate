const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const authMiddleware = (req, res, next) => {
    console.log("Cookies Received:", req.cookies);
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;