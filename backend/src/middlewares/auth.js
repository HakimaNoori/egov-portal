// middlewares/auth.js
import jwt from "jsonwebtoken";

// ✅ Authentication
export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ✅ Role hierarchy
const roleHierarchy = {
  citizen: 1,
  officer: 2,
  dhead: 3,
  admin: 4,
};

// ✅ Authorization middleware
export function authorize(minRole) {
  return (req, res, next) => {
    const userLevel = roleHierarchy[req.user.role] || 0;
    const requiredLevel = roleHierarchy[minRole] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
