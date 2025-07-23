import { useEffect, useRef, useState } from "react"
import CalendarioPsicologo from "../../component/homepsicologo/CalendarioPsicologo"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"
import { Badge, Card, Col, Container, Row } from "react-bootstrap"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import "/src/css/CalendarioPsicologoPagina.css"

import type { RichiestaAppuntamento } from "../../utilities/InterfaceTypes"

const CalendarioPsicologoPagina = () => {
  const calendarioRef = useRef<any>(null)
  const [richieste, setRichieste] = useState<RichiestaAppuntamento[]>([])
  const [, setPsicologo] = useState<any>(null)

  const fetchPsicologo = async () => {
    try {
      const res = await fetchTokenScaduto(
        `${process.env.REACT_APP_BACKEND_URL}/psicologo/me`,
        {}
      )
      const data = await res.json()
      setPsicologo(data)
    } catch (err) {
      console.error("Errore psicologo:", err)
    }
  }

  const caricaRichieste = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${process.env.REACT_APP_BACKEND_URL}/richieste-appuntamento/psicologo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error("Errore nel caricamento richieste")
      const data = await res.json()
      setRichieste(data)
    } catch (err) {
      console.error("Errore richieste:", err)
    }
  }

  useEffect(() => {
    caricaRichieste(), fetchPsicologo
  }, [])

  const handleRefresh = () => {
    calendarioRef.current?.refresh()
    caricaRichieste()
  }

  const aggiornaStatoRichiesta = async (id: number, stato: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${process.env.REACT_APP_BACKEND_URL}/richieste-appuntamento/${id}/stato?stato=${stato}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error("Errore nell'aggiornamento stato")
      handleRefresh()
    } catch (err) {
      console.error("Errore aggiornamento stato:", err)
    }
  }

  const richiesteInAttesa = richieste.filter(
    (r: RichiestaAppuntamento) => r.stato === "IN_ATTESA"
  )
  const appuntamentiAccettati = richieste.filter(
    (r: RichiestaAppuntamento) => r.stato === "ACCETTATA"
  )

  console.log(richieste)
  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />
      <Container>
        <Row>
          <Col lg={6} className="m-0 mb-4">
            <CalendarioPsicologo ref={calendarioRef} />
          </Col>
          <Col lg={6} className="my-3">
            <h4 className="h-verde">Richieste di appuntamento in attesa</h4>
            {richiesteInAttesa.length === 0 ? (
              <p>Nessuna richiesta in attesa.</p>
            ) : (
              <ul className="list-group mb-4">
                {richiesteInAttesa.map((r: any) => (
                  <li
                    key={r.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>
                        {r.nomeCliente} {r.cognomeCliente}
                      </strong>{" "}
                      – {r.data} alle {r.ora}
                      <br />
                      <em>{r.messaggio}</em>
                    </div>

                    <div className="btn-group">
                      <button
                        className="button-accetta"
                        onClick={() =>
                          aggiornaStatoRichiesta(r.id, "ACCETTATA")
                        }
                      >
                        Accetta
                      </button>
                      <button
                        className="button-rifiuta"
                        onClick={() =>
                          aggiornaStatoRichiesta(r.id, "RIFIUTATA")
                        }
                      >
                        Rifiuta
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h4 className="mt-4 mb-0 h-verde">Lista degli appuntamenti</h4>
            <div className="div-lista-appuntamenti">
              {appuntamentiAccettati.length === 0 ? (
                <p>Nessun appuntamento in programma.</p>
              ) : (
                appuntamentiAccettati.map((r: any) => (
                  <Card key={r.id} className="my-3">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="h-verde">
                          {r.nomeCliente} {r.cognomeCliente} – {r.data} alle{" "}
                          {r.ora}
                        </strong>

                        {r.messaggio === "" ? (
                          <p>
                            <strong className="text-secondary">
                              Messaggio del cliente :{" "}
                            </strong>
                            Nessun messaggio
                          </p>
                        ) : (
                          <p>
                            <strong className="text-secondary">
                              Messaggio del cliente :
                            </strong>
                            {r.messaggio}
                          </p>
                        )}
                      </div>

                      <Badge className="badge bg-success">APPROVATO</Badge>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CalendarioPsicologoPagina
