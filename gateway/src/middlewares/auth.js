const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
    }    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, error: "Unauthorized: Invalid token format" });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // يفضل توضيح الخطأ لليوزر (اختياري)
            // console.error("JWT Error:", err.message); 
            return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired token" });
        }
        
        req.user = user;
        next();
    });
};

module.exports = auth;