import Container from 'react-bootstrap/Container';
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer-container">
      <div className="footer-inner-container">
        <div className="footer-grid">
          {/* Mission Statement - Left Side */}
        <div className="footer-column">
        <div className="logo-container">
            <div className="logo-icon">
            <img src="icon.svg" alt="Coddle logo" className="logo-icon-img" />
            </div>
        </div>
        <p className="footer-description">
            One-stop fish app for spots & species.
        </p>
        </div>

          {/* Data Sources Column */}
          <div className="footer-column">
            <h3 className="footer-subtitle">Data Sources</h3>
            <ul className="footer-list">
              <li>
                <div className="footer-item">
                  <a
                    href="https://usa.fishermap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    FisherMap
                  </a>
                </div>
              </li>
              <li>
                <div className="footer-item">
                  <a
                    href="https://www.fishbase.se/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Fishbase.se
                  </a>
                </div>
              </li>
              <li>
                <div className="footer-item">
                  <a
                    href="https://www.sportsmans.com/fishing-lures-types-chart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Sportmans
                  </a>
                </div>
              </li>
              <li>
                <div className="footer-item">
                  <a
                    href="https://commons.wikimedia.org/wiki/Main_Page"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Wikimedia Commons
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <h3 className="footer-subtitle">Navigation</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">Home</a>
              </li>
              <li>
                <a href="#" className="footer-link">Species</a>
              </li>
              <li>
                <a href="#" className="footer-link">Locations</a>
              </li>
              <li>
                <a href="#" className="footer-link">Lures</a>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="footer-column">
            <h3 className="footer-subtitle">Contacts</h3>
            <div className="footer-contacts">
              <div className="footer-contact-item">
                <span className="contact-icon">📂</span> {/* Placeholder for GitLab Icon */}
                <a
                  href="https://gitlab.com/elenawikoff/cs373-idb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitLab Repo
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon">📑</span> {/* Placeholder for API Documentation Icon */}
                <a
                  href="https://utcs-cs373-group1.postman.co/workspace/utcs-cs373-group1~3ac00cd0-77b1-4c25-882e-17a6da2430f7/collection/46076704-066f19ff-7f9e-418b-bf6d-71a9dd03c09f?action=share&creator=43121659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  API Documentation
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon">📧</span> {/* Placeholder for Mail Icon */}
                <a
                  href="elenawikoff@utexas.edu"
                  className="footer-link"
                >
                  elenawikoff@utexas.edu
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">© 2025 Coddle Cloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;