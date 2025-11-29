const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    req.user = user;
    next();
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden. Admin access required.' });
};

const isOrganizer = (req, res, next) => {
  if (req.user && req.user.role === 'ORGANIZER') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden. Organizer access required.' });
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isOrganizer
};