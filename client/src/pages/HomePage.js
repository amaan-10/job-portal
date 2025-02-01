import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="landing-page">
        {/* Hero Section */}
        <header className="hero-section">
          <div className="text-center">
            <h1 className="title-heading">Welcome to Employ-Mee</h1>
            <h6 className="gradient-text">
              "Connecting Dreams to Careers:
              <br />
              Your Gateway to
              <span className="text-primary"> Professional Success</span> !"
            </h6>
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
