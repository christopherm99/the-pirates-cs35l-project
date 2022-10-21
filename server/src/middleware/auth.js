export function requiresAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send("You must be logged in");
}

export function requiresAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isadmin) {
    return next();
  }
  res.status(403).send("You must be an administrator");
}
