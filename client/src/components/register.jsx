import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { registerUser } from "../services/userService";
import "./css/register.css";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = async () => {
    const user = this.state.data;
    try {
      const response = await registerUser(user);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        return this.state.errors;
      }
    }
  };

  render() {
    return (
      <div
        id="registerContainer"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center mt-4">User Registration</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
        <p>Already have an account?</p>
        <Link name={"loginLink"} to={"/login"}>
          Login
        </Link>
      </div>
    );
  }
}

export default RegisterForm;
