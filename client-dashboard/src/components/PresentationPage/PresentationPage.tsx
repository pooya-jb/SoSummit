// Update your PresentationPage component
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Presentation.styles.css";
import SOS_screen from "../../assets/SOS_screen_mockup.png";
import dashboard from "../../assets/dashboard.png";

export default function PresentationPage() {
  useEffect(() => {
    AOS.init();

    return () => AOS.refreshHard();
  }, []);

  return (
    <div>
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
          <div className="feature" data-aos="fade-up" data-aos-offset="250">
            <img
              src={SOS_screen}
              alt="screenshot of app"
              className="sosImg"
              data-aos="fade-right"
              data-aos-offset="200"
            />
            <div className="text" data-aos="fade-left" data-aos-offset="200">
              <h3>Instant SOS calls</h3>
              <div className="feature-content">
                <p>
                  Introducing Instant SOS Calls – the ultimate safety solution
                  for ski resorts and their patrons! With a simple tap, skiers
                  can summon assistance in seconds, ensuring a seamless and
                  secure experience on the slopes. All they have to do is hold
                  down the SOS button for 3 seconds, and their precise location
                  is instantly relayed to resort staff for a swift response.
                  Elevate safety standards, boost guest confidence, and redefine
                  the resort experience with Instant SOS Calls – because safety
                  is paramount, and help should always be just a touch away.
                </p>
              </div>
            </div>
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="200">
            <div
              className="text"
              data-aos="fade-right"
              data-aos-offset="200"
            >
              <h3>
                <strong>Real-Time</strong>
                <br /> Location Tracking
              </h3>
              <div className="feature-content">
                <p>
                  Revolutionize ski resort management with the ability to
                  monitor ski patrollers and locate injured or lost users in
                  real-time. This innovative feature enhances safety,
                  streamlines operations, and ensures peace of mind with just a
                  glance at the dashboard. With Real-Time Location Tracking,
                  administrators have a comprehensive overview of resort
                  activities, ensuring swift responses to incidents while
                  prioritizing guest safety.
                </p>
              </div>
            </div>

            <img
              src={dashboard}
              alt="screenshot of dashboard"
              className="dashboardImg"
              data-aos="fade-left"
              data-aos-offset="200"
            />
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="250">
            <img
              src={SOS_screen}
              alt="screenshot of app"
              className="sosImg"
              data-aos="fade-right"
              data-aos-offset="200"
            />
            <div className="text" data-aos="fade-left" data-aos-offset="200">
              <h3>Customizable Alerts</h3>
              <div className="feature-content">
                <p>
                  Transform safety management at your ski resort with SoSummit's
                  tailored notifications, designed to enhance the skier
                  experience. Keep your guests informed of any critical updates,
                  from severe weather updates to lift issues. With Customizable
                  Alerts, elevate guest satisfaction and safety standards,
                  setting your resort apart as the ultimate destination for
                  unforgettable skiing adventures.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
