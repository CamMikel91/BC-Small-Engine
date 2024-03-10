const express = require("express");
const router = express.Router();
const { Service, validateService } = require("../models/service");

// Create a new service
router.post("/", async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const service = new Service({
    machineType: req.body.machineType,
    serviceType: req.body.serviceType,
    serviceDescription: req.body.serviceDescription,
    serviceIncludes: req.body.serviceIncludes,
    servicePrice: req.body.servicePrice,
    serviceNotes: req.body.serviceNotes,
  });

  try {
    await service.save();
    res.send(service);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong...");
  }
});

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort("machineType");
    res.send(services);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong...");
  }
});

// Get a single service
router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).send("Service not found.");
  res.send(service);
});

// Update a service
router.put("/:id", async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const service = await Service.findByIdAndUpdate(
    req.params.id,
    {
      machineType: req.body.machineType,
      serviceType: req.body.serviceType,
      serviceDescription: req.body.serviceDescription,
      serviceIncludes: req.body.serviceIncludes,
      servicePrice: req.body.servicePrice,
      serviceNotes: req.body.serviceNotes,
    },
    { new: true }
  );

  if (!service) return res.status(404).send("Service not found.");
  res.send(service);
});

// Delete a service
router.delete("/:id", async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).send("Service not found.");
  res.send(service);
});

module.exports = router;
