import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import "./css/login.css";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(
        data.email.toLowerCase(),
        data.password
      );
      localStorage.setItem("x-auth-token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        id="loginContainer"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center">Login</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <p>Don't have an account?</p>
        <Link name={"registerLink"} to={"/register"}>
          Register
        </Link>
      </div>
    );
  }
}

export default Login;
