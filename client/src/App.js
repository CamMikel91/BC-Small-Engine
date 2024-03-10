import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Nav from "./components/nav";
import Services from "./components/services";
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
    const services = await getServices();
    const machineTypes = this.getMachineTypes(services);
    this.setState({ services, machineTypes });
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
    const { machineTypes, activeMachineType, services } = this.state;
    return (
      <>
        <header>
          <Nav
            machineTypes={machineTypes}
            setActiveMachineType={this.handleActiveMachineType}
          />
        </header>
        <div className="contentArea">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  machineTypes={machineTypes}
                  setActiveMachineType={this.handleActiveMachineType}
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
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
