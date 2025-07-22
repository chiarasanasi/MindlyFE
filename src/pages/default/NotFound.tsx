import { Link } from "react-router-dom"
import NavBarMenu from "../../component/NavBarMenu"
import "../../css/Mindly.css"
import "../../css/NotFound.css"
import { Col, Container, Row } from "react-bootstrap"

const NotFound = () => {
  return (
    <>
      <NavBarMenu />
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="spazio-dalla-navbar-404 d-flex flex-column align-items-center">
              <h1 className="display-4 fw-bold h-verde">404</h1>
              <p className="lead">La pagina che cerchi non esiste.</p>
              <Link to="/" className="button-green text-decoration-none">
                Torna alla home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NotFound
