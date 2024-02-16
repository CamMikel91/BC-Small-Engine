const mongoose = require("mongoose");
const Joi = require("joi");

const serviceSchema = new mongoose.Schema({
  machineType: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  serviceType: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  serviceDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  servicePrice: {
    type: Number,
    required: true,
  },
  serviceNotes: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 255,
  },
});

const Service = mongoose.model("Service", serviceSchema);

const schema = Joi.object({
  machineType: Joi.string().min(2).max(50).required(),
  serviceType: Joi.string().min(2).max(50).required(),
  serviceDescription: Joi.string().min(2).max(255).required(),
  servicePrice: Joi.number().required(),
  serviceNotes: Joi.string().min(2).max(255),
});

function validateService(service) {
  return schema.validate(service);
}

module.exports.Service = Service;
module.exports.validateService = validateService;
