import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

console.log(process.env["GOOGLE_CLIENT_ID"]);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "https://www.example.com/oauth2/redirect/google",
      scope: ["profile"],
      state: true,
    },
    () => {}
  )
);

const router = express.Router();

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

export default router;
