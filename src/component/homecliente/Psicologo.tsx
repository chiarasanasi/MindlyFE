import "/src/css/Mindly.css"
import "/src/css/Psicologo.css"
import { useEffect, useState } from "react"
import { Container, Card, Row, Col, Badge } from "react-bootstrap"
import NavBarClientePsico from "../NavbarClientePsico"
import SidebarCliente from "../Sidebar"

const Psicologo = () => {
  const [psicologo, setPsicologo] = useState<any>(null)
  const [cliente, setCliente] = useState<any>(null)

  useEffect(() => {
    const utente = localStorage.getItem("utente")
    if (utente) {
      const parsed = JSON.parse(utente)
      setPsicologo(parsed.psicologo)
      setCliente(parsed)
    }
  }, [])

  if (!psicologo) {
    return (
      <div className="text-center mt-5">
        <p>Caricamento informazioni dello psicologo...</p>
      </div>
    )
  }

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Card className="shadow p-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={psicologo.immagineProfilo}
                  alt={psicologo.nome}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <h4 className="fw-bold mb-1">
                  {psicologo.nome} {psicologo.cognome}
                </h4>
                <div className="d-flex">
                  <p className="mb-1 mx-2">Età: {psicologo.eta}</p>
                  <p className="mb-1 mx-2">Genere: {psicologo.genere}</p>
                </div>
                <p className="mb-1 text-muted">{psicologo.email}</p>

                <p className="mb-1">
                  Specializzazione:{" "}
                  <strong>{psicologo.specializzazione}</strong>
                </p>
              </div>

              <p className="m-3"> {psicologo.descrizione}</p>
              <div className="mt-2 text-center">
                {psicologo.tagList?.map((tag: string, index: number) => (
                  <Badge key={index} bg="success" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Psicologo
