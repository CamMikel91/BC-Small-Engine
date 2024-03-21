import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./components/home";
import Nav from "./components/nav";
import Services from "./components/services";
import About from "./components/about";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import Footer from "./components/footer";
import { getServices } from "./services/servicesService";
import "./app.css";

class App extends Component {
  state = {
    services: [],
    machineTypes: [],
    activeMachineType: "Mower",
  };

  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
    try {
      const services = await getServices();
      const machineTypes = this.getMachineTypes(services);
      this.setState({ services, machineTypes });
    } catch (ex) {
      console.log(ex);
    }
  }

  getMachineTypes = (services) => {
    const machineTypes = services
      .map((service) => service.machineType)
      .filter((service) => service !== "All");
    return Array.from(new Set(machineTypes));
  };

  handleActiveMachineType = (activeMachineType) => {
    this.setState({ activeMachineType });
  };

  render() {
    const { machineTypes, activeMachineType, services, user } = this.state;
    return (
      <>
        <header>
          <Nav
            machineTypes={machineTypes}
            setActiveMachineType={this.handleActiveMachineType}
            user={user}
          />
        </header>
        <div id="contentArea">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  machineTypes={machineTypes}
                  setActiveMachineType={this.handleActiveMachineType}
                  user={user}
                />
              }
            />
            <Route
              path="/services"
              element={
                <Services
                  activeServices={services
                    .filter(
                      (service) =>
                        service.machineType === activeMachineType ||
                        service.machineType === "All"
                    )
                    .sort((b, a) => a.serviceType.localeCompare(b.serviceType))}
                  activeMachineType={activeMachineType}
                  setActiveMachineType={this.handleActiveMachineType}
                  machineTypes={machineTypes}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

export default App;
