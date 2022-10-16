import "./config.js";
import express from "express";

import api from "./api/index.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", authRouter);
app.use("/practice", api.practice);
app.use("/signup", api.signup);
app.use("/users", api.users);

// putting sql stuff here for now, we can move it to a different module later if desired

app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
