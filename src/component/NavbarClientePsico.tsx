import Container from "react-bootstrap/Container"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react"
import "../css/Mindly.css"
import "../css/Navbar.css"

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
        <CNavbar expand="lg" className="navbar-custom py-3">
          <CContainer fluid className="m-0 p-0">
            <CNavbarBrand as={Link} to="/">
              <img src="/img/Logo_Lungo.svg" alt="Logo" className="logo m-0" />
            </CNavbarBrand>
            <CNavbarToggler onClick={() => setVisible(!visible)} />
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav className="me-auto align-items-center">
                {ruolo === "CLIENTE" && (
                  <>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href={`/cliente/${username}/home`}>
                        Profilo
                      </CNavLink>
                    </CNavItem>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href={`/cliente/${username}/diario`}>
                        Il mio Diario
                      </CNavLink>
                    </CNavItem>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href={`/cliente/${username}/calendario`}>
                        Calendario
                      </CNavLink>
                    </CNavItem>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href={`/cliente/${username}/psicologo`}>
                        Il mio Psicologo
                      </CNavLink>
                    </CNavItem>
                  </>
                )}
                {ruolo === "PSICOLOGO" && (
                  <>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href="#">Profilo</CNavLink>
                    </CNavItem>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href="#">I miei Clienti</CNavLink>
                    </CNavItem>
                    <CNavItem className="nav-item-responsive">
                      <CNavLink href="#">Calendario</CNavLink>
                    </CNavItem>
                  </>
                )}

                {visible && (
                  <CNavItem className="nav-item-responsive text-center">
                    <button className="button-green" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  </CNavItem>
                )}
              </CNavbarNav>
            </CCollapse>
            {isDesktop && (
              <div className="ms-auto d-flex align-items-center">
                <button className="button-green" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            )}
          </CContainer>
        </CNavbar>
      </Container>
    </>
  )
}

export default NavBarClientePsico
