const jwt = require("jsonwebtoken");

// Authentication middleware
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return res.status(401).json({
                message: "Invalid Token!",
            });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SecretKey);
        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid Token!",
            });
        }
        req.token = token;
        req.id = decodedToken.id;
        req.email = decodedToken.email;
        req.departmentId = decodedToken.departmentId;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token!",
        });
    }
};
module.exports = authenticateToken;
