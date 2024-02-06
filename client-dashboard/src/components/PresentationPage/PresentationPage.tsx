// Update your PresentationPage component
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Presentation.styles.css";
import SOS_screen from '../../assets/SOS_screen_mockup.png';

export default function PresentationPage() {
  useEffect(() => {
    AOS.init();

    return () => AOS.refreshHard()
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
            <img src={SOS_screen} alt="screenshot of app" className="sosImg"/>
            <div className="feature-content">
              <h3>Instant SOS calls</h3>
              <p>Allows skiers to request assistance at the touch of a button. Should a skier require help, all they have to do is open the app, select the type of help they need, and finally hold down the SOS button for 3 seconds. Their live location is then sent to the ski resort.</p>
            </div>
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="200">
            <div className="feature-content">
              <h3>Real-Time Location Tracking</h3>
              <p>
                Stay informed with live updates on the location of ski patrollers
                and individuals in need.
              </p>
            </div>
          </div>

          <div className="feature" data-aos="fade-up" data-aos-offset="200">
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
