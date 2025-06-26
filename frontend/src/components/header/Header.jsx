import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
import { ReactSVG } from "react-svg";
import logo from "../../assets/coddle-logo-dark.svg";
// import logoPNG from "../../assets/coddle-logo-dark-16x9.png";
import "./header.css";

const Header = () => {
   return (
      <Navbar expand="lg" className="">
         <Container fluid>
            <Navbar.Brand as={Link} to="/">
               <ReactSVG
                  beforeInjection={(svg) => {
                     svg.classList.add("header-logo");
                     svg.setAttribute("style", "width: 150px");
                  }}
                  className="logo-wrapper"
                  desc="Coddle.cloud Logo"
                  title="Coddle.cloud"
                  fallback={() => <h1>Coddle.cloud</h1>}
                  src={logo}
               />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={Link} to="/spots">
                     Nearby
                     <br />
                     Fishing Spots
                  </Nav.Link>
                  <Nav.Link as={Link} to="/fish-species">
                     Nearby
                     <br />
                     Fish Species
                  </Nav.Link>
                  <Nav.Link as={Link} to="/lures">
                     Lure
                     <br />
                     Options
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                     About
                     <br />
                     Coddle.me
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
