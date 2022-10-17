import express from "express";

import { requiresAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
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
