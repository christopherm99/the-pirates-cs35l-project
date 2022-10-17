import express from "express";
import { requiresAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requiresAuth, (req, res) => {
  console.log(res.body);
  res.status(200).send("OK");
});

export default router;
