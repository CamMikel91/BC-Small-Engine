import React from "react";
import "./css/about.css";

const About = () => {
  return (
    <>
      <div id="aboutBanner" className="container-fluid d-flex">
        <h1 className="mx-auto my-auto">Welcome to BC Small Engine Repair</h1>
      </div>
      <div id="aboutContentArea" className="container-fluid">
        <div className="row">
          <section id="missionSection">
            <div className="col-12">
              <h3>
                We are dedicated to our customers and will do everything
                possible to make sure you are satisfied and confident in the
                work performed on your equipment 100% of the time.
              </h3>
            </div>
          </section>
        </div>
        <div className="row my-5">
          <div className="col-sm-12 col-md-6 d-flex flex-row">
            <div className="card aboutCard mx-auto">
              <div className="card-header aboutCardHeader">Who We Are</div>
              <div className="card-body">
                <p className="card-text">
                  BC Small Engine is a locally owned business founded in 2000,
                  we are a small team of seasoned mechanics and motorsport
                  enthusiasts with over 40 years of combined mechanical
                  experience. We're dedicated to our customers and take pride in
                  our work.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 d-flex flex-row">
            <div className="card aboutCard mx-auto">
              <div className="card-header aboutCardHeader">Skills</div>
              <div className="card-body">
                <p className="card-text">
                  We are manufacturer trained and trusted as a designated
                  warranty/repair service center for many of the top brands in
                  the industry. Regardless of the repair size or scope, we are
                  here to provide you with top quality repairs and the best
                  service in town.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
