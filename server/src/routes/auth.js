import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import db from "../../db.js";

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:8080/oauth2/redirect/google",
      scope: ["profile", "email"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      db.query("SELECT * FROM users WHERE user_id = ?", profile.id)
        .then(([cred]) => {
          if (!cred.length) {
            // User is not registered yet
            // TODO: Insert more user data (isadmin and phonenumber)
            db.query(
              "INSERT INTO users (username, pfp, email) VALUES (?, ?, ?)",
              [
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
  return cb(null, user.user_id);
});

passport.deserializeUser((id, cb) => {
  db.query("SELECT * FROM users WHERE user_id = ?", id)
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
});

router.get("/login", function (req, res) {
  res.send(`<h1>Sign in</h1>
  <a class="button google" href="/login/federated/google">Sign in with Google</a>
  `);
});

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
