const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden. Invalid token.' });
    }
    req.user = user;
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Case insensitive check
    if (req.user.role.toLowerCase() === role.toLowerCase()) {
      return next();
    }

    return res.status(403).json({ message: `Forbidden. ${role} access required.` });
  };
};

// Backward compatibility aliases
const isAuthenticated = authenticateToken;
const isAdmin = authorizeRole('Admin');
const isOrganizer = authorizeRole('Organizer');

module.exports = {
  authenticateToken,
  authorizeRole,
  isAuthenticated,
  isAdmin,
  isOrganizer
};