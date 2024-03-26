const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const port = config.get("port");
const db = config.get("db");
const users = require("./routes/users");
const services = require("./routes/services");
const coupons = require("./routes/coupons");

// Check for environment variables
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Middleware
app.use(express.json());

// Routes
app.use("/users", users);
app.use("/services", services);
app.use("/coupons", coupons);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
