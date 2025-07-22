import { useNavigate } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/RegistrazioneLogin.css"
import NavBarMenu from "../../component/NavBarMenu"

const RegistrazioneLogin = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="sfondo">
        <div className="background-overlay">
          <NavBarMenu />

          <div className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100 justify-content-center">
              <Col lg={4} className="text-center">
                <h3>Sei già registrato?</h3>
                <button
                  className="mt-3 button-green"
                  onClick={() => navigate("/login")}
                >
                  Vai al Login
                </button>
              </Col>

              <Col lg={4} className="text-center">
                <h3>Nuovo su Mindly?</h3>
                <button
                  className="mt-3 button-green"
                  onClick={() => navigate("/registrazione")}
                >
                  Registrati
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrazioneLogin
