import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import db from "../../db.js";

const router = express.Router();

async function passFun(accessToken, refreshToken, profile, cb) {
  try {
    let [cred] = await db.query(
      "SELECT * FROM users WHERE google_id = ?",
      profile.id
    );
    if (!cred.length) {
      // User is not registered yet, insert the relevant info
      // TODO: Insert more user data (isadmin and phonenumber)
      try {
        let [ret] = await db.query(
          "INSERT INTO users (google_id, username, pfp, email) VALUES (?, ?, ?, ?)",
          [
            profile.id,
            profile.displayName,
            profile.photos[0].value,
            profile.emails[0].value,
          ]
        );
        cb(null, {
          user_id: ret.insertId,
        });
      } catch (err) {
        cb(err);
      }
    } else {
      // Otherwise, user is registered
      cb(null, cred[0]);
    }
  } catch (err) {
    cb(err);
  }
}

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
    passFun
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
    .then(([user]) => setTimeout(() => cb(null, user[0]), 0))
    .catch((err) => setTimeout(() => cb(err), 0));
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
