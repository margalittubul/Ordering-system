import jwt from 'jsonwebtoken';

// Middleware לאימות טוקן JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; 

    const token = authHeader.slice(7); 
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next(); 
    } catch (e) {
        res.status(403).json({ message: 'Invalid or expired token' }); 
    }
};

// Middleware לבדיקת תפקיד משתמש
const roleMiddleware = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied: No user found' }); 
    }
    if (req.user.role !== role) {
        return res.status(403).json({ message: `Access denied: Only ${role}s can perform this action` }); 
    }
    next(); 
};

export { authMiddleware, roleMiddleware };
