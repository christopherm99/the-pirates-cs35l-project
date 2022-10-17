import express from "express";

import practice from "./practice.js";
import signup from "./signup.js";
import users from "./users.js";

// TODO: Add authentication for CORS?
const router = express.Router();

router.use("/practice", practice);
router.use("/signup", signup);
router.use("/users", users);

export default router;
