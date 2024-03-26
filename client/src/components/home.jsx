import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";

class Home extends Component {
  render() {
    const { machineTypes, setActiveMachineType, activeCoupon, user } =
      this.props;
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
              {/* Services Section */}
              <div id="services" className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="homeCards card h-100">
                  <img
                    id="servicesIcon"
                    src="/images/servicesIcon_02.png"
                    className="card-img-top"
                    alt="Services"
                  />
                  <div className="card-header">
                    <h5 className="card-title">Services</h5>
                  </div>
                  <div className="card-body">
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
              {/* Coupon Section */}
              <div id="couponCard" className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="homeCards card h-100">
                  <img
                    id="couponIcon"
                    src="/images/couponIcon_01.png"
                    className="card-img-top"
                    alt="CouponIcon"
                  />
                  <div className="card-header">
                    <h5 className="card-title">Deal of the Month</h5>
                  </div>

                  {!user && (
                    <div id="loggedOutCouponBody" className="card-body">
                      <h6 id="couponTitle" className="card-text">
                        Sign in to see this month's deal! Registration is fast
                        and free!
                      </h6>
                      <Link to="/login" className="btn">
                        Login
                      </Link>
                    </div>
                  )}

                  {user && (
                    <div className="card-body">
                      <h6 id="couponTitle" className="card-text">
                        {activeCoupon && activeCoupon.title}
                      </h6>
                      <p id="couponDescription" className="card-text">
                        {activeCoupon && activeCoupon.description}
                      </p>
                      <p id="couponInstructions">
                        {activeCoupon && activeCoupon.instructions}
                      </p>
                      <p id="couponNote" className="card-text">
                        *{activeCoupon && activeCoupon.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Parts Section */}
              <div id="parts" className="col-sm-12 col-lg-4 mb-5">
                <div className="homeCards card h-100">
                  <img
                    id="partsIcon"
                    src="/images/partsIcon_02.png"
                    className="card-img-top"
                    alt="Parts"
                  />

                  <div className="card-header">
                    <h5 className="card-title">Parts</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      We can help you find the parts you need, so you can get up
                      and running again as soon as possible.
                    </p>
                    <p className="card-text">
                      We keep a large selection of parts in stock and also have
                      a "boneyard" of machines if you're looking for parts that
                      might not be available anymore.
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
