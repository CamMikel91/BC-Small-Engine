const mongoose = require("mongoose");
const Joi = require("joi");

const couponSchema = new mongoose.Schema({
  monthCode: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  month: {
    type: String,
    required: true,
    Enumerator: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  instructions: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 500,
  },
  note: {
    type: String,
    required: false,
    maxlength: 255,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

const schema = Joi.object({
  monthCode: Joi.number().min(1).max(12).required(),
  month: Joi.string()
    .valid(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    )
    .required(),
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(10).max(500).required(),
  instructions: Joi.string().min(10).max(500),
  note: Joi.string().max(255),
});

function validateCoupon(coupon) {
  return schema.validate(coupon);
}

module.exports.Coupon = Coupon;
module.exports.validateCoupon = validateCoupon;
