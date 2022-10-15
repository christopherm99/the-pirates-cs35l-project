import express from "express";

import routers from "./api/index"

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/practice", routers.practice);
app.use("/signup", routers.signup);
app.use("/users", routers.users);

app.listen(port, () => {
  console.log(`Started server on port http://localhost:${port}/`);
});
