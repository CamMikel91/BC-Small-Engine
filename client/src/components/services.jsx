import React, { Component } from "react";
import "./css/services.css";

class Services extends Component {
  state = {};

  render() {
    const {
      activeServices,
      setActiveMachineType,
      activeMachineType,
      machineTypes,
    } = this.props;
    return (
      <>
        <section id="servicesBanner" className="banner">
          <img id="servicesLogo" src="/images/bcLogo.png" alt="BC Logo" />
          <div className="servicesHeaderCard card">
            <div className="card-header">
              <h1>{activeMachineType} Services</h1>
            </div>
            <div className="card-body">
              <label htmlFor="servicesDropdown">
                Select your machine type to see available services:
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="servicesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Find your machine
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="servicesDropdown"
                >
                  {machineTypes &&
                    machineTypes.map((machineType) => (
                      <li key={machineType}>
                        <button
                          onClick={() => setActiveMachineType(machineType)}
                          className="dropdown-item"
                        >
                          {machineType}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div id="servicesContainer" className="container-fluid">
          <div className="row pt-3 d-flex justify-content-center">
            {activeServices.map((service) => (
              <div
                key={service._id}
                className="col-xxl-4 col-lg-6 col-sm-12 mb-4 d-flex justify-content-center"
              >
                <div className="card serviceCard">
                  <div className="card-header serviceCardHeader p-0">
                    {service.serviceType}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text serviceDescription">
                      {service.serviceDescription}
                    </p>
                    {service.serviceIncludes &&
                      service.serviceIncludes.length > 0 && (
                        <>
                          <label
                            className="mb-2 mt-auto"
                            htmlFor="serviceIncludesList"
                          >
                            <strong>Includes:</strong>
                          </label>
                          <ul
                            name="serviceIncludesList"
                            className=" serviceIncludesList list-group mb-0"
                          >
                            {service.serviceIncludes.map((include) => (
                              <li
                                className="serviceIncluded list-group-item"
                                key={include}
                              >
                                {include}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                  </div>
                  <div className="card-footer d-flex flex-column">
                    {service.serviceType === "Hourly" ? (
                      <p className="card-text servicePrice">
                        <strong>${service.servicePrice}</strong> /hr
                        <span className="servicePriceNote">+ Parts & Tax</span>
                      </p>
                    ) : (
                      <p className="card-text servicePrice">
                        <strong>${service.servicePrice}</strong>
                        <span className="servicePriceNote">+ Parts & Tax</span>
                      </p>
                    )}
                    {service.serviceNotes &&
                      service.serviceNotes.length > 0 && (
                        <p className="card-text serviceNotes">
                          *{service.serviceNotes}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Services;
