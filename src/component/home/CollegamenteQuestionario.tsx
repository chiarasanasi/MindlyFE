import { Col, Container, Row } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/CollegamenteQuestionario.css"
import { Link } from "react-router-dom"

const CollegamentoQuestionario = () => {
  return (
    <>
      <div className="collegamento-questionario">
        <Container>
          <Row>
            <Col
              xs={12}
              className="d-flex flex-lg-row flex-md-row flex-sm-column align-items-sm-center flex-column align-items-center justify-content-center"
            >
              <img src="/img/mobile_2.svg" alt="" className="phone mb-sm-5" />
              <div className="contenitore">
                <img
                  src="/img/inizia-da-te.png"
                  alt="inizia-da-te"
                  className="inizia-da-te"
                />

                <p className="inizia-da-te-testo">
                  Compilare il questionario è il primo passo per trovare lo
                  psicologo più adatto a te. Bastano pochi minuti per
                  raccontarci chi sei, cosa stai cercando e come possiamo
                  aiutarti davvero. È semplice, gratuito e ti apre la strada
                  verso un percorso pensato su misura per te.
                </p>
                <button className="button-green">
                  <Link
                    to="/questionario"
                    className="text-decoration-none text-white"
                  >
                    VAI AL QUESTIONARIO !
                  </Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CollegamentoQuestionario
