import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);

        res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        });
        
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}