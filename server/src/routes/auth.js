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
      scope: ["profile"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      db.query(
        "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
        ["https://accounts.google.com", profile.id],
        (err, cred) => {
          if (err) {
            return cb(err);
          }
          if (!cred) {
            // User is not registered yet
            // TODO: Insert more user data here?
            db.query(
              "INSERT INTO users (name) VALUES (?)",
              profile.displayName,
              (err, results) => {
                if (err) {
                  return cb(err);
                }
                let id = results.insertId;
                db.query(
                  "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                  [id, "https://accounts.google.com", profile.id],
                  (err) => {
                    if (err) {
                      return cb(err);
                    }
                    return cb(null, {
                      id,
                      name: profile.displayName,
                    });
                  }
                );
              }
            );
          } else {
            // Otherwise, user is registered
            db.query(
              "SELECT * FROM users WHERE id = ?",
              cred.user_id,
              (err, row) => {
                if (err) {
                  return cb(err);
                }
                if (!row) {
                  return cb(null, false);
                } // Should never reach this state
                return cb(null, row);
              }
            );
          }
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(()=> {
    cb(null, { id: user.id, username: user.username, name: user.name })
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(()=> {
    return cb(null, user);
  })
})

router.get("/login", function (req, res) {
  res.send(`<h1>Sign in</h1>
  <a class="button google" href="/login/federated/google">Sign in with Google</a>
  `);
});

router.get("/login/federated/google", passport.authenticate("google"));

router.get("/oauth2/redirect/google", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login"
}))

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
