import { useState, useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import { createViewMonthAgenda } from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import { Alert, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { createEventModalPlugin } from "@schedule-x/event-modal"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

const CalendarioCliente = () => {
  const cliente = JSON.parse(localStorage.getItem("utente") || "{}")

  const location = useLocation()
  const isClienteCalendario =
    location.pathname.includes("/cliente/") &&
    location.pathname.includes("/calendario")

  const eventsService = createEventsServicePlugin()

  const eventModal = createEventModalPlugin()

  const calendar = useCalendarApp({
    views: [createViewMonthAgenda()],
    plugins: [eventsService, eventModal, createEventModalPlugin],
  })

  const caricaEventi = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        "http://localhost:8080/richieste-appuntamento/eventi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) throw new Error("Errore nel caricamento eventi")
      const data = await res.json()

      const eventiFormattati = data.map((ev: any) => ({
        id: ev.id,
        title: ev.title,
        start: ev.start.split("T")[0],
        end: ev.end.split("T")[0],
        description: ev.description || "Nessun messaggio",
      }))

      console.log(eventiFormattati)
      console.log("Cliente", cliente)

      eventsService.set(eventiFormattati)
    } catch (err) {
      console.error("Errore eventi:", err)
    }
  }

  const [richieste, setRichieste] = useState<RichiestaAppuntamento[]>([])

  const richiesteInAttesa = richieste.filter((r) => r.stato === "IN_ATTESA")

  const caricaRichieste = async () => {
    const token = localStorage.getItem("token")
    const res = await fetchTokenScaduto(
      "http://localhost:8080/richieste-appuntamento/cliente",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (res.ok) {
      const data = await res.json()
      setRichieste(data)
    }
  }

  useEffect(() => {
    caricaEventi(), caricaRichieste()
  }, [])

  // ===================== FORM PER LA RICHIESTA =====================

  const [data, setData] = useState("")
  const [ora, setOra] = useState("")
  const [messaggio, setMessaggio] = useState("")
  const [successo, setSuccesso] = useState(false)
  const [errore, setErrore] = useState(false)
  const [erroreDataPassata, setErroreDataPassata] = useState(false)

  const inviaRichiesta = async (e: React.FormEvent) => {
    e.preventDefault()
    setErroreDataPassata(false)

    const oggi = new Date()
    oggi.setHours(0, 0, 0, 0)

    const dataSelezionata = new Date(data)
    dataSelezionata.setHours(0, 0, 0, 0)

    if (dataSelezionata < oggi) {
      setErroreDataPassata(true)
      return
    }

    const token = localStorage.getItem("token")

    try {
      const res = await fetchTokenScaduto(
        "http://localhost:8080/richieste-appuntamento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data, ora, messaggio }),
        }
      )

      if (!res.ok) throw new Error("Errore nella richiesta")

      setSuccesso(true)
      setErrore(false)
      setData("")
      setOra("")
      setMessaggio("")
      caricaEventi()
    } catch (err) {
      console.error(err)
      setErrore(true)
      setSuccesso(false)
    }
  }

  return (
    <div>
      <NavBarClientePsico />
      <SidebarCliente cliente={cliente} />
      <Container>
        <Row className=" justify-content-center">
          <Col lg={6}>
            <div className="my-3">
              <ScheduleXCalendar calendarApp={calendar} />
            </div>
          </Col>

          {isClienteCalendario && (
            <>
              <Col lg={6}>
                <Row className="flex-column gap-4">
                  <Col className="my-lg-3 my-4 ">
                    <h4 className="h-verde">Richiedi un appuntamento</h4>

                    {successo && (
                      <Alert variant="success">
                        Richiesta inviata con successo!
                      </Alert>
                    )}
                    {errore && (
                      <Alert variant="danger">
                        Errore durante l'invio. Riprova.
                      </Alert>
                    )}

                    <Form onSubmit={inviaRichiesta}>
                      <Row>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                              type="date"
                              value={data}
                              onChange={(e) => setData(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Ora</Form.Label>
                            <Form.Control
                              type="time"
                              value={ora}
                              onChange={(e) => setOra(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Messaggio</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={1}
                              value={messaggio}
                              placeholder="Scrivi qui..."
                              onChange={(e) => setMessaggio(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <button className="button-green mt-3" type="submit">
                        Invia richiesta
                      </button>
                      {erroreDataPassata && (
                        <Alert variant="warning" className="mt-3">
                          La data selezionata non può essere nel passato.
                        </Alert>
                      )}
                    </Form>
                  </Col>
                  <Col className="my-lg-0 my-4">
                    <h4 className="h-verde mb-3">Richieste in attesa</h4>
                    <div style={{ maxHeight: "380px", overflow: "auto" }}>
                      {richiesteInAttesa.length === 0 ? (
                        <p>Nessuna richiesta in attesa.</p>
                      ) : (
                        richiesteInAttesa.map((r) => (
                          <Card key={r.id} className="my-2">
                            <Card.Body>
                              <strong className="h-verde">Data:</strong>{" "}
                              {r.data} —{" "}
                              <strong className="h-verde">Ora:</strong> {r.ora}
                              <br />
                              <strong className="h-verde">
                                Messaggio:
                              </strong>{" "}
                              {r.messaggio || "Nessun messaggio"}
                            </Card.Body>
                          </Card>
                        ))
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default CalendarioCliente
