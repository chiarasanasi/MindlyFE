import Container from "react-bootstrap/Container"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../css/Mindly.css"
import "../css/Navbar.css"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const NavBarClientePsico = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem("username")

  const ruolo = localStorage.getItem("ruolo")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Container>
        <Navbar expand="lg" className="navbar-custom py-3">
          <Container fluid className="m-0 p-0">
            <Navbar.Brand>
              <img src="/img/Logo_Lungo.svg" alt="Logo" className="logo m-0" />
            </Navbar.Brand>
            <Navbar.Toggle onClick={() => setVisible(!visible)} />
            <Navbar.Collapse className="navbar-collapse">
              <Nav className="me-auto align-items-center">
                {ruolo === "CLIENTE" && (
                  <>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/cliente/${username}/home`}>
                        Profilo
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/cliente/${username}/diario`}>
                        Il mio Diario
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/cliente/${username}/calendario`}>
                        Calendario
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/cliente/${username}/psicologo`}>
                        Il mio Psicologo
                      </NavLink>
                    </NavItem>
                  </>
                )}
                {ruolo === "PSICOLOGO" && (
                  <>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/psicologo/${username}/home`}>
                        Profilo
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/psicologo/${username}/clienti`}>
                        I miei Clienti
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item-responsive">
                      <NavLink to={`/psicologo/${username}/calendario`}>
                        Calendario
                      </NavLink>
                    </NavItem>
                  </>
                )}

                {visible && (
                  <NavItem className="nav-item-responsive text-center">
                    <button className="button-green" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  </NavItem>
                )}
              </Nav>
            </Navbar.Collapse>
            {isDesktop && (
              <div className="ms-auto d-flex align-items-center">
                <button className="button-green" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            )}
          </Container>
        </Navbar>
      </Container>
    </>
  )
}

export default NavBarClientePsico
