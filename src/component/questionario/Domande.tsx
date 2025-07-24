import { useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/Domande.css"
import { useNavigate } from "react-router-dom"

import "/src/css/Mindly.css"
import "/src/css/Domande.css"
import domande from "./DomandeQuestionario"

function Domande() {
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState<{ [key: number]: any }>({})
  const [valoreCorrente, setValoreCorrente] = useState<string | string[]>("")
  const [errore, setErrore] = useState<string>("")

  const navigate = useNavigate()

  const domanda = domande[indice]
  const nomeUtente = risposte[1]

  const handleProsegui = () => {
    setErrore("")

    if (domanda.tipo === "welcome") {
      setIndice((prev) => prev + 1)
      return
    }

    const rispostaObbligatoria =
      domanda.tipo !== "aperta" || domanda.obbligatoria === true

    const haRisposto =
      (Array.isArray(valoreCorrente) && valoreCorrente.length > 0) ||
      (!Array.isArray(valoreCorrente) && valoreCorrente !== "")

    if (rispostaObbligatoria && !haRisposto) {
      setErrore("Per favore, rispondi alla domanda prima di continuare.")
      return
    }

    const nuoveRisposte = {
      ...risposte,
      [domanda.id]: Array.isArray(valoreCorrente)
        ? valoreCorrente
        : [valoreCorrente],
    }
    setRisposte(nuoveRisposte)
    setValoreCorrente("")
    setErrore("")

    const ultimaDomanda = indice === domande.length - 1

    if (ultimaDomanda) {
      localStorage.setItem("ruolo", "CLIENTE")
      localStorage.setItem(
        "risposteQuestionario",
        JSON.stringify(nuoveRisposte)
      )
      navigate("/questionario/registrazione")
    } else {
      setIndice((prev) => prev + 1)
    }
  }

  const renderDomanda = () => {
    if (domanda.tipo === "welcome") {
      return (
        <h3 className="domanda">
          Ciao {nomeUtente}, iniziamo il tuo questionario Mindly{" "}
        </h3>
      )
    }

    return (
      <>
        <div className="d-flex flex-column ">
          <h4 className="domanda text-center">{domanda.testo}</h4>
          {domanda.descrizione && (
            <p
              className="descrizione text-center"
              dangerouslySetInnerHTML={{ __html: domanda.descrizione }}
            ></p>
          )}

          {domanda.tipo === "aperta" && (
            <Form.Control
              className="campo-form"
              placeholder={
                domanda.id === 3
                  ? "Quanti anni hai..."
                  : "Scrivi qui la tua risposta..."
              }
              type={domanda.id === 3 ? "number" : "text"}
              value={valoreCorrente as string}
              onChange={(e) => setValoreCorrente(e.target.value)}
            />
          )}

          {domanda.tipo === "sceltaSingola" && (
            <>
              <Row className="justify-content-center">
                <Col lg={6}>
                  {domanda.opzioni?.map((opzione) => (
                    <Form.Check
                      key={opzione}
                      type="radio"
                      name={`domanda-${domanda.id}`}
                      label={opzione}
                      checked={valoreCorrente === opzione}
                      onChange={() => setValoreCorrente(opzione)}
                    />
                  ))}
                </Col>
              </Row>
            </>
          )}
          {domanda.tipo === "sceltaMultipla" && (
            <>
              <Row className="justify-content-center">
                <Col lg={6}>
                  {domanda.opzioni?.map((opzione) => (
                    <Form.Check
                      key={opzione}
                      type="checkbox"
                      name={`domanda-${domanda.id}`}
                      label={opzione}
                      checked={
                        Array.isArray(valoreCorrente) &&
                        valoreCorrente.includes(opzione)
                      }
                      onChange={(e) => {
                        const nuovaLista = Array.isArray(valoreCorrente)
                          ? [...valoreCorrente]
                          : []
                        if (e.target.checked) {
                          nuovaLista.push(opzione)
                        } else {
                          const index = nuovaLista.indexOf(opzione)
                          if (index > -1) nuovaLista.splice(index, 1)
                        }
                        setValoreCorrente(nuovaLista)
                      }}
                    />
                  ))}
                </Col>
              </Row>
            </>
          )}
        </div>
      </>
    )
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col lg={6} className="mx-auto">
          {renderDomanda()}
          {errore && (
            <p className="text-danger text-center mt-3" role="alert">
              {errore}
            </p>
          )}
          <div className="mt-4 text-center ">
            <button onClick={handleProsegui} className="button-green">
              CONTINUA..
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Domande
