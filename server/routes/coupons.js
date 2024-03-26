const express = require("express");
const router = express.Router();
const { Coupon, validateCoupon } = require("../models/coupon");

// Create a new coupon
router.post("/", async (req, res) => {
  const { error } = validateCoupon(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const coupon = new Coupon({
    monthCode: req.body.monthCode,
    month: req.body.month,
    title: req.body.title,
    description: req.body.description,
    instructions: req.body.instructions,
    note: req.body.note,
  });

  try {
    await coupon.save();
    res.send(coupon);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong...");
  }
});

// Get all coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find().sort("month");
    res.send(coupons);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong...");
  }
});

// Get a single coupon
router.get("/:id", async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).send("Coupon not found.");
  res.send(coupon);
});

// Update a coupon
router.put("/:id", async (req, res) => {
  const { error } = validateCoupon(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      monthCode: req.body.monthCode,
      month: req.body.month,
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      note: req.body.note,
    },
    { new: true }
  );

  if (!coupon) return res.status(404).send("Coupon not found.");
  res.send(coupon);
});

// Delete a coupon
router.delete("/:id", async (req, res) => {
  const coupon = await Coupon.findByIdAndRemove(req.params.id);
  if (!coupon) return res.status(404).send("Coupon not found.");
  res.send(coupon);
});

module.exports = router;
