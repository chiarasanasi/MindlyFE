import { Col, Row } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/CollegamenteQuestionario.css"

const CollegamentoQuestionario = () => {
  return (
    <>
      <div className="collegamento-questionario">
        <Row>
          <Col lg={6} md={6} xs={12} className="phone-col">
            <img src="/img/Mobile.svg" alt="" className="phone" />
          </Col>
          <Col lg={6} md={6} xs={12} className="d-flex align-items-center ">
            <div className="contenitore">
              <img
                src="/img/inizia-da-te.png"
                alt="inizia-da-te"
                className="inizia-da-te"
              />

              <p className="inizia-da-te-testo">
                Compilare il questionario è il primo passo per trovare lo
                psicologo più adatto a te. Bastano pochi minuti per raccontarci
                chi sei, cosa stai cercando e come possiamo aiutarti davvero. È
                semplice, gratuito e ti apre la strada verso un percorso pensato
                su misura per te.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CollegamentoQuestionario
