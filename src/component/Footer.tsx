import "/src/css/Mindly.css"
import "/src/css/Footer.css"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="mindly-footer py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          <Col xs={12} md={4} className="mb-3">
            <h5 className="footer-logo">Mindly</h5>
            <p className="small text-muted">
              Il tuo benessere mentale, al centro del nostro impegno.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <h6 className="fw-bold text-success">Navigazione</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#header">Home</a>
              </li>
              <li>
                <a href="#steps">Cammina con noi </a>
              </li>

              <li>
                <Link to="/questionario">Questionario</Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <h6 className="fw-bold text-success">Seguici</h6>
            <div className="social-icons">
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr />
        <p className="text-center small text-muted mb-0">
          © {new Date().getFullYear()} Mindly - Tutti i diritti riservati.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
