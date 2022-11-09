import express from "express";
import _ from "lodash";

import { requiresAuth } from "../middleware/auth.js";
import { getUser } from "../helpers/users.js";
import db from "../../db.js";

const router = express.Router();

// returns all data for the current week in json format
router.get("/", (req, res) => {
  // Query database for all practices from this week
  db.query(
    "SELECT * FROM practices \
    WHERE YEARWEEK(leave_time) = YEARWEEK(NOW()) \
    ORDER BY leave_time ASC, driver_id ASC"
  )
    .then(async ([rows]) => res.json(await parseRows(rows)))
    .catch((err) => res.status(400).send(err));
});

// Returns all data for any given week (Date of any day in week)
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

// Parses raw row data from database into expected JSON.
async function parseRows(rows) {
  // Get all info for all referenced users
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
      // Convert dates to weekday names (ie. "Tuesday")
      row.leave_time.toLocaleDateString("en-US", { weekday: "long" })
    )
    .mapValues((day) =>
      _.chain(day)
        .groupBy("driver_id") // Group users under their driver
        .map((val, id) => ({
          // Insert relevant user data for each user
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
