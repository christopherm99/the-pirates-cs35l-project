import express from "express";

import db from "../../db.js";
import { requiresAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requiresAuth, (req, res) => {
  console.log(req.body);
  let queries = [];
  req.body.days_to_practice.forEach((time) => {
    queries.push(
      db.query(
        "INSERT INTO sign_ups (user_id, timestamp, car_capacity, leave_time) VALUES (?, ?, ?, ?)",
        [req.user.user_id, Date.now(), req.body.car_capacity, Date(time)]
      )
    );
  });
  Promise.all(promises).then(() => {
    res.status(200).send("OK");
    // TODO: refresh practices table
  });
});

export default router;
