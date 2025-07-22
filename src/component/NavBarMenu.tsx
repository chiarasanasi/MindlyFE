import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
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
              <Nav.Link
                as={HashLink}
                smooth
                to="/#recensioni"
                className="small-text"
              >
                Recensioni
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                smooth
                to="/#steps"
                className="small-text"
              >
                Come Funziona
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                smooth
                to="/questionario"
                className="small-text"
              >
                Questionario
              </Nav.Link>
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
