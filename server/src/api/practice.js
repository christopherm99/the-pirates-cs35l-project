import express from "express";

import { requiresAuth } from "../middleware/auth.js";
import con from "../../db.js";

const router = express.Router();

// returns all data for the current week in json format
router.get("/", (req, res) => {

  // This line is needed in order to allow localhost to the client running on localhost:3000 to access the data.
  // More info at https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
  // TODO: we will need to include this line in other places in the server if we want to allow our client to use other api endpoints
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  // test data
  res.json({
    Tuesday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Wednesday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Thursday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Friday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
  });

    querytext = "";

  // real data
    /*
    con.query(querytext, (err, result) => {

        // maybe should remove this?
        if (err) throw err;
        // remove if not testing
        console.log("1 record inserted. ID: " + result.insertId);

        return;
    });
    */



});

router.get("/:week", requiresAuth, (req, res) => {
  res.json({
    Tuesday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Wednesday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Thursday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
    Friday: [
      {
        driver: {
          name: "Eric Wu",
          pfp_id: 0,
          uid: 0,
        },
        depart_time: "2:00",
        passengers: [
          {
            name: "Christopher Milan",
            pfp_id: 1,
            uid: 1,
          },
        ],
      },
    ],
  });
});

export default router;
