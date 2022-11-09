import "./config.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { createProxyMiddleware } from "http-proxy-middleware";

import db from "./db.js";

import apiRouter from "./src/api/index.js";
import authRouter from "./src/routes/auth.js";

const app = express();
const port = 8080;

// ES6 Hack for static server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Auto-converts POST requests with JSON to objects

// Stores user sessions (cookies) in MySQL
app.use(
  session({
    secret: "testsecret", // TODO: Change this (maybe .env?)
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(
      {
        // TODO: Session store options go here
        // https://github.com/chill117/express-mysql-session#with-an-existing-mysql-connection-or-pool
      },
      db
    ),
  })
);
// Use passportjs to authenticate users
app.use(passport.authenticate("session"));

// Backend routers
app.use("/", authRouter); // Login/Logout router
app.use("/api", apiRouter); // API endpoints

// For serving frontend
if (process.env.NODE_ENV === "production") {
  // If we are in production, serve the files in ./static/
  app.use(express.static(path.join(__dirname, "static")));
  // Ensures React.js routing works
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "static", "index.html"));
  });
} else {
  // Otherwise, in development, use a proxy to the react dev server
  console.log("Using proxy for React! Make sure React dev server is running.");
  app.use(
    "/*",
    createProxyMiddleware({
      target: "http://0.0.0.0:3000", // Link to react dev server
      changeOrigin: true, // Just in case this matters
      ws: true, // Websockets for dev server
    })
  );
}

// Default route, if nothing else catches
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// If an error is ever thrown, here's the router for it
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
