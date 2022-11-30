import express from "express";
import _ from "lodash";
import dayjs from "dayjs";

import db from "../../db.js";
import { requiresAuth } from "../middleware/auth.js";
import moment from "moment";

const router = express.Router();

// Allows users to signup for practices by POSTing JSON.
router.post("/", requiresAuth, async (req, res) => {
  // First delete any signups from same user for this week,
  // allowing user to change their mind.
  await db.query(
    "DELETE FROM sign_ups \
      WHERE user_id = ? \
      AND YEARWEEK(leave_time) = YEARWEEK(NOW())",
    req.user.user_id
  );
  let queries = [];
  // Insert into sign_ups for each
  req.body.days_to_practice.forEach((time) => {
    queries.push(
      db.query(
        "INSERT INTO sign_ups (user_id, timestamp, car_capacity, leave_time) VALUES (?, ?, ?, ?)",
        [
          req.user.user_id,
          dayjs().toDate(),
          req.body.car_capacity,
          dayjs(time).toDate(),
        ]
      )
    );
  });
  Promise.all(queries)
    .then(async () => {
      // Deletes old data.
      await db.query(
        "DELETE FROM practices \
        WHERE YEARWEEK(leave_time) = YEARWEEK(NOW())"
      );
      let [drivers] = await db.query(
        "SELECT * FROM sign_ups \
        WHERE YEARWEEK(leave_time) = YEARWEEK(NOW()) \
        AND car_capacity != 0 \
        ORDER BY leave_time ASC, timestamp ASC"
      );
      let queries = [];
      if (drivers) {
        _.forEach(
          _.groupBy(drivers, (driver) => driver.leave_time.toDateString()),
          async (drivers, day) => {
            let [passengers] = await db.query(
              "SELECT * FROM sign_ups \
            WHERE leave_time >= ? \
            AND leave_time < ? \
            AND car_capacity = 0 \
            ORDER BY leave_time ASC, timestamp ASC",
              [
                dayjs(day).startOf("day").toDate(),
                dayjs(day).endOf("day").toDate(),
              ]
            );
            drivers.forEach((driver) => {
              let carMembers = passengers.splice(0, driver.car_capacity - 1);
              carMembers.push(driver);
              carMembers.forEach((passenger) => {
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
                      _.maxBy(carMembers, "leave_time").leave_time,
                    ]
                  )
                );
              });
            });
            passengers.forEach((passenger) => {
              queries.push(
                db.query(
                  "INSERT INTO practices ( \
                user_signup_id, \
                user_id, \
                leave_time \
              ) VALUES (?, ?, ?)",
                  [passenger.id, passenger.user_id, passenger.leave_time]
                )
              );
            });
          }
        );
        }

        let drivers_by_date;
        if (drivers) {
            drivers_by_date = _.groupBy(drivers, driver => driver.leave_time.toDateString());
        }
        else {
            drivers_by_date = {}
        }

        const firstDayOfCurrentWeek = moment().startOf("week"); // This will be a Sunday
        let all_days = [];
        all_days.push(firstDayOfCurrentWeek.add(2, "days").format("ddd MMM DD YYYY")); // Tuesday
        all_days.push(firstDayOfCurrentWeek.add(1, "days").format("ddd MMM DD YYYY")); // Wednesday
        all_days.push(firstDayOfCurrentWeek.add(1, "days").format("ddd MMM DD YYYY")); // Thursday
        all_days.push(firstDayOfCurrentWeek.add(1, "days").format("ddd MMM DD YYYY")); // Friday
        console.log(all_days);
        for (let i = 0; i < all_days.length; i++) {
            if (!drivers_by_date[all_days[i]]) {
                // add all current signups to a null car
                let [passengers] = await db.query(
                    "SELECT * FROM sign_ups \
            WHERE leave_time >= ? \
            AND leave_time < ? \
            AND car_capacity = 0 \
            ORDER BY leave_time ASC, timestamp ASC",
                    [
                        dayjs(all_days[i]).startOf("day").toDate(),
                        dayjs(all_days[i]).endOf("day").toDate(),
                    ]
                );
                passengers.forEach((passenger) => {
                    queries.push(
                        db.query(
                            "INSERT INTO practices ( \
                                user_signup_id, \
                                user_id, \
                                leave_time \
                              ) VALUES (?, ?, ?)",
                            [passenger.id, passenger.user_id, passenger.leave_time]
                        )
                    );
                });
            }
        }

      return Promise.all(queries);
    })
    .then(() => res.status(200).send("OK"))
    .catch((err) => res.status(500).send(err));
});

export default router;
