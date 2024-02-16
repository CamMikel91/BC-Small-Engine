const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: false,
    match: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  },
  street: {
    type: String,
    required: false,
    maxlength: 255,
  },
  unit: {
    type: String,
    required: false,
    maxlength: 10,
  },
  city: {
    type: String,
    required: false,
    maxlength: 50,
  },
  state: {
    type: String,
    required: false,
    maxlength: 2,
  },
  zip: {
    type: String,
    required: false,
    maxlength: 10,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")),
  street: Joi.string().max(255),
  unit: Joi.string().max(10),
  city: Joi.string().max(50),
  state: Joi.string().max(2),
  zip: Joi.string().max(10),
  isAdmin: Joi.boolean(),
});

function validateUser(user) {
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
