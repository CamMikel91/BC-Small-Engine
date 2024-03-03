import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Nav from "./components/nav";
import Services from "./components/services";
import Footer from "./components/footer";
import { getServices } from "./services/servicesService";
import "./app.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const services = await getServices();
    const machineTypes = this.getMachineTypes(services);
    this.setState({ services, machineTypes });
    // console.log(machineTypes);
  }

  getMachineTypes = (services) => {
    const machineTypes = services.map((service) => service.machineType);
    return Array.from(new Set(machineTypes));
  };

  render() {
    const { machineTypes } = this.state;
    return (
      <>
        <header>
          <Nav machineTypes={machineTypes} />
        </header>
        <div className="contentArea">
          <Routes>
            <Route path="/" element={<Home machineTypes={machineTypes} />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
