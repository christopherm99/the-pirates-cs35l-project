import "./config.js";
import express from "express";
import session from "express-session";
import MySQLStore from "express-mysql-session";

import db from "./db.js";

import api from "./api/index.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello world");
});

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

app.use("/", authRouter);
app.use("/practice", api.practice);
app.use("/signup", api.signup);
app.use("/users", api.users);

app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
