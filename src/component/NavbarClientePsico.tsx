import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import "../css/Mindly.css"
import "../css/Navbar.css"

const NavBarClientePsico = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" className="navbar-custom py-3">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src="/img/Logo_Lungo.svg" alt="Logo" className="logo m-0" />
            </Link>
          </Navbar.Brand>

          <Nav.Link href="/">
            <button className="button-green">LOGOUT</button>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarClientePsico
