import express from "express";
import _ from "lodash";

import { requiresAuth } from "../middleware/auth.js";
import { getUser } from "../helpers/users.js";
import db from "../../db.js";

const router = express.Router();

// returns all data for the current week in json format
router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  db.query(
    "SELECT * FROM practices \
    WHERE YEARWEEK(leave_time) = YEARWEEK(NOW()) \
    ORDER BY leave_time ASC, driver_id ASC"
  )
    .then(async ([rows]) => res.json(await parseRows(rows)))
    .catch((err) => res.status(400).send(err));
});

router.get("/:week", requiresAuth, (req, res) => {
  db.query(
    "SELECT * FROM practices \
    WHERE YEARWEEK(leave_time) = YEARWEEK(?) \
    ORDER BY leave_time ASC, driver_id ASC",
    req.params.week
  )
    .then(async ([rows]) => res.json(await parseRows(rows)))
    .catch((err) => res.status(400).send(err));
});

async function parseRows(rows) {
  let users = {};
  for (const row of rows) {
    if (!users[row.driver_id]) {
      users[row.driver_id] = await getUser(row.driver_id);
    }
    if (!users[row.user_id]) {
      users[row.user_id] = await getUser(row.user_id);
    }
  }
  return _.chain(rows)
    .groupBy((row) =>
      row.leave_time.toLocaleDateString("en-US", { weekday: "long" })
    )
    .mapValues((day) =>
      _.chain(day)
        .groupBy("driver_id")
        .map((val, id) => ({
          driver: {
            name: users[id].username,
            pfp: users[id].pfp,
            user_id: id,
          },
          leave_time: val[0].leave_time,
          passengers: val.map((passenger) => ({
            name: users[passenger.user_id].username,
            pfp: users[passenger.user_id].pfp,
            user_id: passenger.user_id,
          })),
        }))
        .value()
    )
    .value();
}

export default router;
