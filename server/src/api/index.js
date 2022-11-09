import express from "express";

import practice from "./practice.js";
import signup from "./signup.js";
import users from "./users.js";

const router = express.Router();

// Use subrouters for each API endpoint.
router.use("/practice", practice);
router.use("/signup", signup);
router.use("/users", users);

export default router;
