import React from "react";

const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">Simple portfolio app</h1>
          <h2 className="white hero-subtitle">
            Based on NodeJs, GraphQl and Apollo
          </h2>
          <div className="button-container">
            <a href="" className="btn btn-main bg-blue ttu">
              Examples
            </a>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img
                className="hero-image"
                src="https://i.udemycdn.com/course/750x422/1652608_662b_8.jpg"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
