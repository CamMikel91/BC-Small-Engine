import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row m-5">
          <div className="col-md-4 col-sm-12">
            <h5 className="footerHeading">Hours</h5>
            <p>Monday-Friday: 8am-5pm</p>
            <p>Saturday: 8am-12pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="col-md-4 col-sm-12">
            <h5 className="footerHeading">Contact</h5>
            <p>Phone: 801-971-2777</p>
            <p>
              Email:
              <a href="mailto:cammikel91@gmail.com">BC Small Engine Repair</a>
            </p>
          </div>
          <div className="col-md-4 col-sm-12">
            <h5 className="footerHeading">Location</h5>
            <p>
              1573 W Phillips Street,
              <br /> Kaysville UT 84037
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
