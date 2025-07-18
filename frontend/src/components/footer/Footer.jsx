import Container from "react-bootstrap/Container";
import { ReactSVG } from "react-svg";
import logo from "../../assets/coddle-logo-dark.svg";
import "./footer.css";
import { Link } from "react-router";
import { FaGitlab } from "react-icons/fa";
import { SiPostman } from "react-icons/si";

const Footer = () => {
   return (
      <footer className="footer-container">
         <div className="footer-inner-container">
            <div className="footer-grid">
               {/* Mission Statement - Left Side */}
               <div className="footer-column">
                  <ReactSVG
                     beforeInjection={(svg) => {
                        svg.classList.add("footer-logo");
                        svg.setAttribute("style", "width: 150px");
                     }}
                     className="logo-wrapper"
                     desc="Coddle.cloud Logo"
                     title="Coddle.cloud"
                     fallback={() => <h1>Coddle.cloud</h1>}
                     src={logo}
                  />
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
                              href="https://www.fishbase.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="footer-link"
                           >
                              Fishbase.org
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
                        <Link to="/" className="footer-link">
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link to="/spots" className="footer-link">
                           Locations
                        </Link>
                     </li>
                     <li>
                        <Link to="/fish-species" className="footer-link">
                           Species
                        </Link>
                     </li>
                     <li>
                        <Link to="/lures" className="footer-link">
                           Lures
                        </Link>
                     </li>
                     <li>
                        <Link to="/about" className="footer-link">
                           About
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Contacts Column */}
               <div className="footer-column">
                  <h3 className="footer-subtitle">Contacts</h3>
                  <div className="footer-contacts">
                     <div className="footer-contact-item">
                        <FaGitlab />
                        &nbsp;
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
                        <SiPostman />
                        &nbsp;
                        <a
                           href="https://utcs-cs373-group1.postman.co/workspace/utcs-cs373-group1~3ac00cd0-77b1-4c25-882e-17a6da2430f7/collection/46076704-066f19ff-7f9e-418b-bf6d-71a9dd03c09f?action=share&creator=43121659"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="footer-link"
                        >
                           API Documentation
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Border */}
            <div className="footer-bottom">
               <p className="footer-bottom-text">
                  © 2025 Coddle Cloud. All rights reserved.
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
