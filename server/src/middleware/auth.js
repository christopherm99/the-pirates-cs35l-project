export function requiresAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send("You must be logged in to view this content");
}
