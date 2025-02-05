import React, { useState } from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

import { Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const containerRef = useRef(null);
  const [animationData, setAnimationData] = useState(null); // Define animation data state
  const [isTab, setIsTab] = useState(window.innerWidth < 992);
  const [isSM, setIsMS] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 992);
      setIsMS(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !animationData) return; // Check if animationData is loaded

    const animation = lottie.loadAnimation({
      container: containerRef.current, // DOM element
      animationData: animationData, // Lottie animation data
      loop: false, // Ensure the animation does not loop
      autoplay: true, // Start the animation automatically
    });

    // Cleanup animation on unmount
    return () => {
      animation.destroy(); // Destroy the animation when component unmounts
    };
  }, [animationData]); // Run effect when animationData changes

  // Set the animationData here based on your use case (static or dynamic)
  useEffect(() => {
    // Example: Load an animation data here (you can replace with actual Lottie JSON)
    import("../assets/animated-logo.json").then((data) => {
      setAnimationData(data); // Set animation data dynamically (ensure path to your JSON file)
    });
  }, []);

  return (
    <>
      <div className="landing-page">
        {/* Hero Section */}
        <header
          className="hero-section d-flex flex-column flex-lg-row justify-content-lg-end align-items-lg-center"
          style={{
            paddingTop: isTab ? 100 : 120,
            paddingBottom: isTab ? 75 : 100,
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              top: isSM ? -35 : isTab ? 0 : 50,
              left: isSM ? 25 : isTab ? 50 : 100,
              width: "90%", // Adjust the width as per your needs
              height: isSM ? "60%" : isTab ? "80%" : "100%", // Adjust the height as per your needs
              zIndex: -1, // Keep the animation behind content
              objectFit: "contain",
            }}
          ></div>
          <div className="col-lg-4" style={{ height: isSM ? 50 : 100 }}>
            .
          </div>
          <div id="heading" className="pe-4 pe-sm-5 me-lg-5 text-end">
            <h1 style={{ color: "#333333", fontSize: isSM ? 28 : 40 }}>
              Welcome to <h1 className="title-heading">Employ-Mee</h1>
            </h1>
            <h6 className="phrase-text" style={{ fontSize: isSM ? 16 : 32 }}>
              "Connecting Dreams to Careers:
              <br />
              Your Gateway to
              <span className="text-primary"> Professional Success</span> !"
            </h6>
            <h5 style={{ color: "#333333", fontSize: isSM ? 18 : 20 }}>
              Now Smarter with{" "}
              <span className="gradient-text fw-bold">
                AI{" "}
                <img
                  height={16}
                  width={16}
                  src="./assets/images/star.png"
                  alt="icon"
                />
              </span>
            </h5>
          </div>
        </header>

        {/* About Us Section */}
        <section id="about-us" className=" p-5">
          <Row>
            <Col md={6}>
              <h2 className="fw-bold">About Us</h2>
              <h4>Unlock Your Future with Our Job Portal</h4>
              <h6 className="description">
                Our platform bridges the gap between ambitious job seekers and
                leading employers around the globe. Whether you're looking to
                take the next step in your career or find the perfect candidate,
                we offer a seamless and efficient experience for both sides.
              </h6>
              <ul className="h6 description">
                <li>
                  <strong>Create your profile</strong> and get noticed by top
                  employers.
                </li>
                <li>
                  <strong>Apply for jobs</strong> that align with your skills
                  and aspirations.
                </li>
                <li>
                  <strong>Get hired</strong> and start your journey towards
                  success.
                </li>
              </ul>
              <h4>Where Aspiration Meets Opportunity</h4>
              <h6 className="description">
                Our job portal is your trusted partner on the path to
                professional growth. We specialize in connecting talent with
                diverse career opportunities, ensuring a smooth and effective
                process for both job seekers and employers.
              </h6>
              <Link
                className="btn-button btn-opacity-success fw-medium text-decoration-none"
                to="/dashboard"
              >
                Let's Get Started &rarr;
              </Link>
            </Col>
            <Col md={6}>
              <img
                src="/assets/images/Group171.svg"
                alt="Job Portal"
                className="img-fluid"
              />
            </Col>
          </Row>
        </section>

        {/* Testimonials Section */}

        <section className="py-5 bg-light">
          <h2 className="text-center fw-medium mb-5">What Our Users Say</h2>
          <Carousel className="pb-5">
            <Carousel.Item>
              <blockquote className="blockquote text-center">
                <p className="pb-4">
                  "This platform helped me land my dream job in just two weeks!
                  <br />
                  The process was so smooth and easy to use."
                </p>
                <footer className="blockquote-footer">
                  John Doe, <cite>Software Engineer</cite>
                </footer>
              </blockquote>
            </Carousel.Item>
            <Carousel.Item>
              <blockquote className="blockquote text-center">
                <p className="pb-4">
                  "The platform is easy to use,
                  <br />
                  and the support team is amazing."
                </p>
                <footer className="blockquote-footer">
                  Jane Smith, <cite>HR Manager</cite>
                </footer>
              </blockquote>
            </Carousel.Item>
            <Carousel.Item>
              <blockquote className="blockquote text-center">
                <p className="pb-4">
                  "A fantastic platform with great job listings.
                  <br />I love how easy it is to track my applications."
                </p>
                <footer className="blockquote-footer">
                  Mary Lee, <cite>Data Scientist</cite>
                </footer>
              </blockquote>
            </Carousel.Item>
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default HomePage;
