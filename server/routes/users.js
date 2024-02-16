const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../models/user");

// Register a new user
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  user = new User({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashed,
    phone: req.body.phone || "",
    street: (req.body.street || "").toLowerCase(),
    unit: (req.body.unit || "").toLowerCase(),
    city: (req.body.city || "").toLowerCase(),
    state: (req.body.state || "").toLowerCase(),
    zip: (req.body.zip || "").toLowerCase(),
  });

  try {
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong...");
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
});

// Update a user
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashed,
        phone: req.body.phone || "",
        street: (req.body.street || "").toLowerCase(),
        unit: (req.body.unit || "").toLowerCase(),
        city: (req.body.city || "").toLowerCase(),
        state: (req.body.state || "").toLowerCase(),
        zip: (req.body.zip || "").toLowerCase(),
      },
      { new: true }
    );

    if (!user) return res.status(404).send("User not found.");
    res.send(user.firstName + " " + user.lastName + " was updated.");
  } catch (ex) {
    res.status(500).send("Something went wrong...");
  }
});

// Delete a user

module.exports = router;
