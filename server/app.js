import "./config.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";

import db from "./db.js";

import apiRouter from "./src/api/index.js";
import authRouter from "./src/routes/auth.js";

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  session({
    secret: "secret goes here",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(
      {
        // Session store options go here
        // https://github.com/chill117/express-mysql-session#with-an-existing-mysql-connection-or-pool
      },
      db
    ),
  })
);

app.use(passport.authenticate("session"));

app.use("/", authRouter);
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "static")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
