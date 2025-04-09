import React, { useState } from "react";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faChartLine,
  faCheckCircle,
  faClock,
  faFilter,
  faIndianRupeeSign,
  faLocationDot,
  faPenToSquare,
  faQuoteLeft,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
};

const HomePage = () => {
  const containerRef = useRef(null);
  const [animationData, setAnimationData] = useState(null); // Define animation data state
  const isMobilePortrait = useMediaQuery(
    "(max-width: 639px) and (max-height: 956px)"
  );
  // const isMobileLandscape = useMediaQuery(
  //   "(max-width: 899px) and (max-height: 639px)"
  // );
  const isTabletPortrait = useMediaQuery(
    "(min-width: 640px) and (max-width: 1023px) and (min-height: 900px) and (max-height: 1279px)"
  );
  // const isTabletLandscape = useMediaQuery(
  //   "(min-width: 900px) and (max-width: 1279px) and (min-height: 640px) and (max-height: 1023px)"
  // );
  const isLaptop = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1279px) and (min-height: 768px) and (max-height: 1439px)"
  );
  const isDesktop = useMediaQuery(
    "(min-width: 1280px) and (min-height: 900px)"
  );
  // const isDesktopLarge = useMediaQuery(
  //   "(min-width: 1600px) and (min-height: 1440px)"
  // );

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

  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Bengaluru, IN",
      salary: "INR 15 LPA",
      tags: ["React", "TypeScript", "UI/UX"],
      match: 98,
      isNew: true,
    },
    {
      title: "Product Manager",
      company: "InnovateLabs",
      location: "Pune, IN",
      salary: "INR 6 LPA",
      tags: ["Product Strategy", "Agile", "B2B"],
      match: 92,
      isNew: true,
    },
    {
      title: "Data Scientist",
      company: "DataDrive Analytics",
      location: "Remote",
      salary: "INR 8 LPA",
      tags: ["Python", "Machine Learning", "SQL"],
      match: 89,
      isNew: false,
    },
  ];

  const getMatchColor = (match) => {
    if (match >= 95) return "bg-success";
    if (match >= 85) return "bg-warning";
    return "bg-primary";
  };

  const features = [
    {
      icon: faFilter,
      title: "Advanced Filtering",
      description:
        "Filter jobs by salary, location, experience level, and more to find exactly what you're looking for.",
    },
    {
      icon: faChartLine,
      title: "Application Tracking",
      description:
        "Keep track of all your applications in one place and never miss an update or deadline.",
    },
    {
      icon: faUsers,
      title: "Recruiter Dashboard",
      description:
        "Post jobs, manage applications, and communicate with candidates all in one platform.",
    },
    {
      icon: faPenToSquare,
      title: "Job Management",
      description:
        "Easily post, edit, and delete job listings with our intuitive interface.",
    },
    {
      icon: faCheckCircle,
      title: "Applicant Status",
      description:
        "Toggle between rejected, shortlisted, and interviewed statuses to keep your hiring organized.",
    },
    {
      icon: faClock,
      title: "Real-time Updates",
      description:
        "Get instant notifications about application status changes and new job matches.",
    },
  ];

  const testimonials = [
    {
      quote:
        "The AI recommendations were spot on! I found my dream job within two weeks of signing up.",
      author: "Sara J.",
      role: "Software Engineer",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As a recruiter, this platform has saved me countless hours. The applicant management system is intuitive and powerful.",
      author: "Mahim T.",
      role: "HR Manager",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The application tracking feature helped me stay organized during my job search. I highly recommend this platform!",
      author: "Jay L.",
      role: "Marketing Specialist",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <>
      <div className="landing-page">
        {/* Hero Section */}
        <header
          className="hero-section d-flex flex-column flex-lg-row justify-content-lg-end align-items-lg-center"
          style={{
            paddingTop: isMobilePortrait
              ? "30vh"
              : isTabletPortrait
              ? "40vh"
              : isLaptop
              ? "35vh"
              : isDesktop
              ? "40vh"
              : "30vh",
            paddingBottom: isMobilePortrait
              ? "30vh"
              : isTabletPortrait
              ? "25vh"
              : isLaptop
              ? "30vh"
              : isDesktop
              ? "30vh"
              : "25vh",
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              top: isMobilePortrait
                ? "8%"
                : isTabletPortrait
                ? "10%"
                : isLaptop
                ? "12%"
                : isDesktop
                ? "5%"
                : "10%",
              left: isMobilePortrait
                ? 25
                : isTabletPortrait
                ? 50
                : isLaptop
                ? 100
                : isDesktop
                ? 100
                : 100,
              width: "90%",
              height: isMobilePortrait
                ? "70%"
                : isTabletPortrait
                ? "80%"
                : isLaptop
                ? "75%"
                : "80%",
              zIndex: -1,
              objectFit: "contain",
            }}
          ></div>
          <div
            className="col-lg-4"
            style={{ height: isMobilePortrait ? 50 : 100 }}
          >
            .
          </div>
          <div id="delay" className="pe-4 pe-sm-5 me-lg-5 text-end">
            <h1
              style={{ color: "#333333", fontSize: isMobilePortrait ? 28 : 40 }}
            >
              Welcome to <h1 className="title-heading">Employ-Mee</h1>
            </h1>
            <h6
              className="phrase-text"
              style={{ fontSize: isMobilePortrait ? 16 : 32 }}
            >
              "Connecting Dreams to Careers:
              <br />
              Your Gateway to
              <span className="text-primary"> Professional Success</span> !"
            </h6>
            <h5
              style={{ color: "#333333", fontSize: isMobilePortrait ? 18 : 20 }}
            >
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

        <div id="delay">
          {/* Hero Section */}
          <section className="position-relative overflow-hidden py-5 py-md-5 bg-white">
            <div className="position-relative z-1">
              <div
                className="mx-auto text-center mb-5"
                style={{ maxWidth: "768px" }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  Find Your Dream Job With AI-Powered Recommendations
                </h1>
                <p className="lead text-muted mb-4">
                  Connect with top employers and discover opportunities
                  perfectly matched to your skills and experience.
                </p>
              </div>
            </div>
          </section>

          {/* AI Recommendations */}
          <section className="py-5 bg-light">
            <div className="">
              <div className="text-center mb-5">
                <span
                  className="badge bg-primary mb-3"
                  style={{ fontSize: 12 }}
                >
                  AI-Powered
                </span>
                <h2 className="h1 fw-bold mb-3">Recommended For You</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
                  Our AI analyzes your profile and preferences to find the
                  perfect job matches.
                </p>
              </div>
              <div className="row gy-4 mx-5 py-4">
                {jobs.map((job, idx) => (
                  <div className="col-md-6 col-lg-4" key={idx}>
                    <div className="card shadow-lg border-0 rounded-3 position-relative h-100">
                      {job.isNew && (
                        <span className="badge bg-success position-absolute top-0 end-0 m-3">
                          New
                        </span>
                      )}
                      <div
                        className={`position-absolute top-0 start-0 w-100 rounded-top-3 ${getMatchColor(
                          job.match
                        )}`}
                        style={{ height: "4px" }}
                      />
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <div>
                            <h5 className="mt-2 mb-3 fw-bold">{job.title}</h5>
                            <div className="text-muted d-flex align-items-center mb-1">
                              <FontAwesomeIcon
                                icon={faBuilding}
                                className="me-2"
                              />
                              <span>{job.company}</span>
                            </div>
                            <div className="text-muted d-flex align-items-center mb-1">
                              <FontAwesomeIcon
                                icon={faLocationDot}
                                className="me-2"
                              />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <div
                            className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center"
                            style={{ width: "48px", height: "48px" }}
                          >
                            <span className="fw-bold text-primary">
                              {job.match}%
                            </span>
                          </div>
                        </div>

                        <div className="text-muted d-flex align-items-center mb-3">
                          <FontAwesomeIcon
                            icon={faIndianRupeeSign}
                            className="me-2"
                          />
                          <span>{job.salary}</span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {job.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="badge bg-light border text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="card-footer bg-light d-flex justify-content-between p-3">
                        <button className="btn btn-outline-secondary btn-sm">
                          Save
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    window.open("/dashboard", "_self");
                  }}
                >
                  View All Recommendations
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-5 bg-white">
            <div className="">
              <div className="text-center mb-5">
                <h2 className="h1 fw-bold mb-3">
                  Powerful Features for Everyone
                </h2>
                <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
                  Whether you're looking for a job or hiring talent, we've got
                  you covered.
                </p>
              </div>
              <div className="row gy-4 mx-5 my-4">
                {features.map((feature, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="card h-100 border-1 shadow-sm transition-all">
                      <div className="card-body p-4">
                        <div className="mb-3">
                          <FontAwesomeIcon
                            icon={feature.icon}
                            className=" fa-2x text-primary"
                          />
                        </div>
                        <h5 className=" fw-bold">{feature.title}</h5>
                        <p className=" text-muted">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-5 px-5 bg-light">
            <div className="">
              <div className="text-center mb-5">
                <h2 className="h1 fw-bold mb-3">How It Works</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
                  Our platform makes job searching and recruiting simple and
                  effective.
                </p>
              </div>
              <div className="row g-4 align-items-center my-4">
                <div className="col-md-6">
                  <div className="vstack gap-4">
                    {[1, 2, 3, 4].map((step, i) => (
                      <div className="d-flex gap-3" key={i}>
                        <div
                          className="d-flex align-items-center justify-content-center p-2 rounded-circle bg-primary text-white fw-bold"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {step}
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">
                            {
                              [
                                "Create Your Profile",
                                "Discover Opportunities",
                                "Apply With Ease",
                                "Track Your Progress",
                              ][i]
                            }
                          </h5>
                          <p className="text-muted mb-0">
                            {
                              [
                                "Upload your resume and complete your profile to get personalized job recommendations.",
                                "Browse AI-recommended jobs or search and filter to find your perfect match.",
                                "One-click applications make it simple to apply to multiple jobs quickly.",
                                "Monitor application statuses and receive updates from employers in real-time.",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-white p-4 rounded-4 shadow">
                    <img
                      src="/assets/images/Group171.svg"
                      alt="Job portal dashboard"
                      className="img-fluid rounded-3 d-flex justify-content-center align-items-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-5 bg-white">
            <div className="">
              <div className="text-center mb-5">
                <h2 className="h1 fw-bold mb-3">What Our Users Say</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
                  Join hundreds of satisfied job seekers and recruiters who
                  found success on our platform.
                </p>
              </div>
              <div className="row gy-4 mx-5 my-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <FontAwesomeIcon
                          icon={faQuoteLeft}
                          className="text-primary mb-3 fs-3 opacity-25"
                        />
                        <p className="card-text fst-italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="card-footer bg-white border-top-0 d-flex align-items-center">
                        <div className="rounded-circle bg-secondary-subtle px-3 fw-semibold py-2 me-3">
                          {testimonial.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="mb-0 fw-semibold">
                            {testimonial.author}
                          </p>
                          <small className="text-muted">
                            {testimonial.role}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-5 bg-primary text-white text-center">
            <div className="">
              <h2 className="h1 fw-bold mb-4">
                Ready to Find Your Perfect Job?
              </h2>
              <p
                className=" text-white h6 opacity-75 mb-4 mx-auto"
                style={{ maxWidth: "640px" }}
              >
                Join thousands of professionals who've found their dream careers
                through our platform.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button
                  className="btn btn-light text-black fw-medium"
                  onClick={() => {
                    window.open("/login", "_self");
                  }}
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-light px-5 pt-5">
            <div className="">
              <div className="row gy-4">
                <div className="">
                  <div className="d-flex align-items-center mb-1">
                    <span className="h5 fw-bold text-black">Employ-Mee</span>
                  </div>
                  <div className="text-black-50 fw-semibold mb-3">
                    Connecting talent with opportunity through AI-powered job
                    matching.
                  </div>
                  <div className="d-flex gap-3">
                    {/* Twitter */}
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-black fa-2xl"
                    />
                    {/* LinkedIn */}
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="text-black fa-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomePage;
