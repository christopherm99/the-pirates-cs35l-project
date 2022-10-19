import "./config.js";
import express from "express";
import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";

import db from "./db.js";

import apiRouter from "./src/api/index.js";
import authRouter from "./src/routes/auth.js";


const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello world");
});

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

function runTest() {
    db.query("select * from users;", (err, result) => {

        // maybe should remove this?
        if (err) throw err;
        // remove if not testing
        console.log(result);

        return;
    });
}

app.use(passport.authenticate("session"));

app.use("/", authRouter);
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
    console.log(`Started server on port http://localhost:${port}/`);
    runTest();
});
