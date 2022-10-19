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
      db.query("SELECT * FROM users WHERE user_id = ?", profile.id)
        .then((cred) => {
          if (!cred) {
            // User is not registered yet
            // TODO: Insert more user data here?
            return db.query(
              "INSERT INTO users (user_id, username) VALUES (?, ?)",
              [profile.id, profile.displayName]
            );
          } else {
            // Otherwise, user is registered
            cb(null, cred);
          }
        })
        .then(() =>
          cb(null, {
            user_id: profile.id,
            username: profile.displayName,
          })
        )
        .catch((err) => cb(err));
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
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
