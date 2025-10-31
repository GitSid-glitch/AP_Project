const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};

const isOrganizer = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'ORGANIZER') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden. Organizer access required.' });
};

module.exports = {
  isAuthenticated,
  isOrganizer
};