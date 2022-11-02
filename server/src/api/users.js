import express from "express";

import db from "../../db.js";
import { requiresAuth, requiresAdmin } from "../middleware/auth.js";
import { getUser } from "../helpers/users.js";

const router = express.Router();

router.get("/all", requiresAuth, (req, res) => {
    db.query("SELECT * FROM users").then(([allusers]) => {
        res.json({
            all: allusers
        })
            .catch((err) => res.status(400).send(err));
    });
});

router.get("/", requiresAuth, (req, res) => {
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
  getUser(req.params.id)
    .then((user) =>
      res.json({
        id: user.user_id,
        name: user.username,
        email: req.isAuthenticated() ? user.email : undefined,
        phone:
          req.isAuthenticated() &&
          (req.user.isadmin || req.user.user_id === req.params.id)
            ? user.phonenumber
            : undefined,
        pfp: user.pfp,
        car_capacity: req.isAuthenticated() ? 5 : undefined, // TODO!
      })
    )
    .catch((err) => res.status(400).send(err));
});

router.post("/", requiresAuth, (req, res) => {
  db.query("UPDATE users SET phonenumber = ? WHERE user_id = ?", [
    req.body.phone,
    req.user.user_id,
  ])
    .then(res.status(200).send("OK"))
    .catch((err) => res.status(500).send(err));
});

router.post("/:id", requiresAdmin, (req, res) => {
  db.query("UPDATE users SET phonenumber = ?, isadmin = ? WHERE user_id = ?", [
    req.body.phone,
    req.body.isadmin,
    req.params.id,
  ])
    .then(res.status(200).send("OK"))
    .catch((err) => res.status(500).send(err));
});

export default router;
