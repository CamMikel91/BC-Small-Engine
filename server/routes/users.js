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
  // Validate the user input
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  // Check if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  // Send the user object back to the client
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token);
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
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("User not found.");
  res.send(user.firstName + " " + user.lastName + " was deleted.");
});

module.exports = router;
