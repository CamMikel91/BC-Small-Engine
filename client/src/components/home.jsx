import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";

class Home extends Component {
  render() {
    const { machineTypes, setActiveMachineType } = this.props;
    return (
      <>
        <section id="homeBanner" className="banner">
          <div className="container-fluid">
            <img id="homeLogo" src="/images/bcLogo.png" alt="BC Logo" />
            <h4 id="bannerMotto">We work hard so you don't have to!</h4>
            <p id="bannerSub">
              Proudly serving Davis County for over 24 years!
            </p>
          </div>
        </section>
        <section>
          <div
            id="homeContainer"
            className="container-fluid  justify-content-around d-flex"
          >
            <div className="row py-5">
              <div id="services" className="col-md-6 col-sm-12">
                <div className="homeCards card h-100">
                  <img
                    id="servicesIcon"
                    src="/images/servicesIcon_02.png"
                    className="card-img-top"
                    alt="Services"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Services</h5>
                    <p className="card-text">
                      As a certified service center for many of the top brands,
                      we provide a complete range of services for all of your
                      small engine and lawn equipment needs.
                    </p>
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
                              <Link
                                to={`/services`}
                                onClick={() =>
                                  setActiveMachineType(machineType)
                                }
                                className="dropdown-item"
                              >
                                {machineType}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div id="parts" className="col-md-6 col-sm-12">
                <div className="homeCards card h-100">
                  <img
                    id="partsIcon"
                    src="/images/partsIcon_02.png"
                    className="card-img-top"
                    alt="Parts"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Parts</h5>
                    <p className="card-text">
                      We can help you find the parts you're looking for so you
                      can get up and running again as soon as possible.
                    </p>
                    <p className="card-text">
                      We keep a large selection of parts in stock and also have
                      a "boneyard" if you're looking for parts that might not be
                      available anymore.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;
