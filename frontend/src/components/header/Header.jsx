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
      <Navbar expand="lg" variant="dark">
         <Container fluid className="d-flex justify-content-between align-items-center">
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
               <Nav className="d-flex justify-content-between align-items-center gap-4">
               <Nav.Link as={Link} to="/spots">Fishing Spots</Nav.Link>
               <Nav.Link as={Link} to="/fish-species?page=1&limit=12">FishDB</Nav.Link>
               <Nav.Link as={Link} to="/lures?page=1&limit=12">Lure Options</Nav.Link>
               <Nav.Link as={Link} to="/about">About</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
