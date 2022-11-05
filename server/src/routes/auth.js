import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import db from "../../db.js";

const router = express.Router();

// Allows users to login with google oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      // URL that we come back to after login flow:
      callbackURL: "http://localhost:8080/oauth2/redirect/google",
      scope: ["profile", "email"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      // Check if this user is already in our database
      // TODO: Use async/await to avoid nested promises
      db.query("SELECT * FROM users WHERE google_id = ?", profile.id)
        .then(([cred]) => {
          if (!cred.length) {
            // User is not registered yet, insert the relevant info
            // TODO: Insert more user data (isadmin and phonenumber)
            db.query(
              "INSERT INTO users (google_id, username, pfp, email) VALUES (?, ?, ?, ?)",
              [
                profile.id,
                profile.displayName,
                profile.photos[0].value,
                profile.emails[0].value,
              ]
            )
              .then(([ret]) => {
                cb(null, {
                  user_id: ret.insertId,
                });
              })
              .catch((err) => cb(err));
          } else {
            // Otherwise, user is registered
            cb(null, cred);
          }
        })
        .catch((err) => cb(err));
    }
  )
);

passport.serializeUser((user, cb) => {
  // When storing a user session, just use the user's id
  return cb(null, user.user_id);
});

passport.deserializeUser((id, cb) => {
  // When retrieving a user from a session, we only stored the user's id, so we
  // need to query the database to get the rest of their info.
  db.query("SELECT * FROM users WHERE user_id = ?", id)
    .then(([user]) => cb(null, user[0]))
    .catch((err) => cb(err));
});

// TODO: remove this
router.get("/login", function (req, res) {
  res.send(`<h1>Sign in</h1>
  <a class="button google" href="/login/federated/google">Sign in with Google</a>
  `);
});

// Login handler
router.get("/login/federated/google", passport.authenticate("google"));

// Callback handler
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Logout handler. Use POST to avoid accidental logouts.
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
