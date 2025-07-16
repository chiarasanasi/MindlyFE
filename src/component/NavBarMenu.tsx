import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import "../css/Mindly.css"
import "../css/Navbar.css"
import { HashLink } from "react-router-hash-link"

const NavBarMenu = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" className="navbar-custom py-3">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src="/img/Logo_Lungo.svg" alt="Logo" className="logo m-0" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <NavDropdown title="Mindly" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={HashLink}
                  smooth
                  to="/#steps"
                  className="small-text"
                >
                  Come Funziona
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={HashLink}
                  smooth
                  to="/#recensioni"
                  className="small-text"
                >
                  Recensioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={HashLink}
                  smooth
                  to="/#i-nostri-psicologi"
                  className="small-text"
                >
                  I nostri psicologi
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#servizi">Servizi</Nav.Link>
              <Nav.Link href="#psicologi">Psicologi</Nav.Link>
              <Nav.Link href="/registrazione-o-login">
                <button className="button-green">LOGIN</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarMenu
