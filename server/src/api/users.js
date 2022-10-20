import express from "express";

import db from "../../db.js";
import { requiresAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requiresAuth, (req, res) => {
  console.log(req.user);
  res.json({
    id: req.user.user_id,
    name: req.user.username,
    email: req.user.email,
    phone: req.user.phonenumber,
    pfp: req.user.pfp,
    car_capacity: 5, // TODO!
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM users where user_id = ?", req.params.id)
    .then(([user]) => {
      if (!user[0]) {
        throw "User not found";
      }
      res.json({
        id: user[0].user_id,
        name: user[0].username,
        email: req.isAuthenticated() ? user[0].email : undefined,
        phone: req.isAuthenticated() && req.user.isadmin ? user[0].phonenumber : undefined,
        pfp: user[0].pfp,
        car_capacity: req.isAuthenticated() ? 5 : undefined, // TODO!
      });
    })
    .catch((err) => res.status(400).send(err));
});

export default router;
