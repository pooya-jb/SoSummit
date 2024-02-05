// Update your PresentationPage component
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Presentation.styles.css";

export default function PresentationPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <header className="site-header js-site-header" role="banner">
        {/* Your header content goes here */}
      </header>

      <main>
        <section
          className="site-hero overlay"
          style={{
            backgroundImage:
              "url(https://m.media-amazon.com/images/I/71pXBighQTL.jpg)",
            height: "100vh",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="header-slogan">
              <span className="main-logo">
                Welcome To <br />
                <span className="logo-red">SoS</span>ummit
              </span>
              <h1 className="slogan">
                Revolutionizing ski resort safety <br /> for a secure and
                enjoyable experience on the slopes.
              </h1>
            </div>
          </div>
          <a
            className="mouse smoothscroll"
            href="#features"
            aria-label="Scroll to features section"
          >
            <div className="mouse-icon" aria-hidden="true">
              <span className="mouse-wheel"></span>
            </div>
          </a>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="feature" data-aos="fade-up" data-aos-offset="200">
            <img src='../../assets/IMG_8223.jpeg' alt="Instant SOS calls" />
            <div className="feature-content">
              <h3>Instant SOS calls</h3>
              <p>Allows skiers to request assistance at the touch of a button.</p>
            </div>
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="200">
            <img src="image1.jpg" alt="Real-Time Location Tracking" />
            <div className="feature-content">
              <h3>Real-Time Location Tracking</h3>
              <p>
                Stay informed with live updates on the location of ski patrollers
                and individuals in need.
              </p>
            </div>
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="200">
            <img src="image3.jpg" alt="Two-Way Communication" />
            <div className="feature-content">
              <h3>Two-Way Communication</h3>
              <p>
                Enable seamless communication between ski resorts and those in
                need through our integrated chat feature.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
