import { useEffect, useState } from "react"
import "/src/css/Mindly.css"
import "/src/css/NostriPsicologi.css"
import { Col, Row } from "react-bootstrap"

const NostriPsicologi = () => {
  const [foto, setFoto] = useState<string[]>([])

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=12")
      .then((res) => res.json())
      .then((data) => {
        const img = data.results.map((u: any) => u.picture.large)
        setFoto(img)
      })
  }, [])

  return (
    <section className="preview-section d-flex align-items-center justify-content-between px-5 py-5">
      <Row className="justify-content-lg-center">
        <Col
          lg={4}
          sm={6}
          xs={12}
          className="text-center d-flex align-items-center"
        >
          <div className="preview-text">
            <h2 className="fw-bold">I NOSTRI PSICOLOGI</h2>
            <p>
              Il nostro team è pronto ad ascoltarti. Scopri i profili dei
              professionisti con cui potrai iniziare il tuo percorso, uno spazio
              sicuro fatto su misura per te.
            </p>
          </div>
        </Col>
        <Col lg={4} sm={6} xs={12}>
          <div className="preview-foto-container">
            {foto.map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`psicologo-${index}`}
                className="preview-foto"
              />
            ))}
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default NostriPsicologi
