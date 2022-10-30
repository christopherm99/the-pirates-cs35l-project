import express from "express";
import _ from "lodash";
import dayjs from "dayjs";

import db from "../../db.js";
import { requiresAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requiresAuth, async (req, res) => {
  await db.query(
    "DELETE * FROM sign_ups \
      WHERE user_id = ? \
      AND YEARWEEK(leave_time) = YEARWEEK(NOW())",
    req.user.user_id
  );
  let queries = [];
  req.body.days_to_practice.forEach((time) => {
    queries.push(
      db.query(
        "INSERT INTO sign_ups (user_id, timestamp, car_capacity, leave_time) VALUES (?, ?, ?, ?)",
        [req.user.user_id, dayjs(), req.body.car_capacity, Date(time)]
      )
    );
  });
  Promise.all(queries).then(async () => {
    let [drivers] = await db.query(
      "SELECT * FROM sign_ups \
        WHERE YEARWEEK(leave_time) = YEARWEEK(NOW()) \
        AND car_capacity != 0 \
        ORDER BY leave_time ASC, timestamp ASC"
    );
    let queries = [];
    _.forEach(
      _.groupBy(drivers, dayjs(drivers.leave_time.toDateString())),
      async (day, drivers) => {
        let [passengers] = await db.query(
          "SELECT * FROM sign_ups \
            WHERE leave_time leave_time >= ? \
            AND leave_time < ? \
            AND car_capacity = 0 \
            ORDER BY leave_time ASC, timestamp ASC",
          [dayjs(day).startOf("day"), dayjs(day).endOf("day")]
        );
        drivers.forEach((driver) => {
          let carMembers = passengers.splice(0, driver.car_capacity);
          carMembers.push(driver);
          passengers.splice(0, driver.car_capacity).forEach((passenger) => {
            queries.push(
              db.query(
                "INSERT INTO practices ( \
                  driver_signup_id, \
                  driver_id, \
                  user_signup_id, \
                  user_id, \
                  leave_time \
                ) VALUES (?, ?, ?, ?, ?)",
                [
                  driver.id,
                  driver.user_id,
                  passenger.id,
                  passenger.user_id,
                  _.maxBy(passengers, "leave_time"),
                ]
              )
            );
          });
        });
        passengers.forEach((passenger) => {
          queries.push(
            db.query(
              "INSERT INTO PRACTICES ( \
                user_signup_id, \
                user_id, \
                leave_time \
              ) VALUES (?, ?, ?, ?, ?)",
              [passenger.id, passenger.user_id, passenger.leave_time]
            )
          );
        });
      }
    );
    Promise.all(queries)
      .then(() => res.status(200).send("OK"))
      .catch((err) => res.status(500).send(err));
  });
});

export default router;
