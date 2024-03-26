import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("x-auth-token");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
