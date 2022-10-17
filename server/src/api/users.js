import express from "express";

const router = express.Router();

router.get("/:id", (req, res) => {
  res.json({
    name: "Christopher Milan",
    email: "chrismilan@ucla.edu",
    phone: "6175481813", // must be logged in
    pfp_id: 1,
    car_capacity: 5, // must be logged in
  });
});

export default router;
