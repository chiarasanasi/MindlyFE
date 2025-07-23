import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import { domande } from "../../component/questionario/DomandeQuestionario"
import "/src/css/Mindly.css"
import "/src/css/ClienteDettaglio.css"
import type { Nota } from "../../utilities/InterfaceTypes"

const ClienteDettaglio = () => {
  const { usernameCliente } = useParams()

  const [cliente, setCliente] = useState<any>(null)
  const [utenteCliente, setUtenteCliente] = useState<any>(null)
  const [risposte, setRisposte] = useState<{ [key: string]: string[] }>({})
  const [psicologo, setPsicologo] = useState<any>(null)

  const [note, setNote] = useState<Nota[]>([])
  const [nuovaNota, setNuovaNota] = useState("")
  const [editNoteId, setEditNoteId] = useState<number | null>(null)
  const [editContenuto, setEditContenuto] = useState("")

  const navigate = useNavigate()

  const caricaCliente = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/psicologo/clienti/${usernameCliente}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (!res.ok) throw new Error("Errore nel caricamento dettagli cliente")
      const data = await res.json()

      setCliente(data)
      console.log(data)
      if (data.risposteQuestionario) {
        setRisposte(JSON.parse(data.risposteQuestionario))
      }
    } catch (err) {
      console.error("Errore:", err)
    }
  }

  const fetchPsicologo = async () => {
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/psicologo/me`
      )
      const data = await res.json()
      setPsicologo(data)
    } catch (err) {
      console.error("Errore psicologo:", err)
    }
  }

  const fetchNotePsicologo = async () => {
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/note-psicologo/${usernameCliente}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        setNote(data)
      }
    } catch (err) {
      console.error("Errore note:", err)
    }
  }

  const fetchUtenteCliente = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/utente/${usernameCliente}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (!res.ok) {
        throw new Error("Errore nel caricamento dettagli utente cliente")
      }

      const data = await res.json()
      setUtenteCliente(data)
    } catch (err) {
      console.error("Errore:", err)
    }
  }

  const salvaNota = async () => {
    const res = await fetchTokenScaduto(
      `${import.meta.env.VITE_BACKEND_URL}/note-psicologo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenuto: nuovaNota,
          clienteId: utenteCliente?.id,
        }),
      }
    )

    if (res.ok) {
      setNuovaNota("")
      fetchNotePsicologo()
    }
  }

  const eliminaNota = async (id: number) => {
    await fetchTokenScaduto(
      `${import.meta.env.VITE_BACKEND_URL}/note-psicologo/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    fetchNotePsicologo()
  }

  const aggiornaNota = async (id: number) => {
    await fetchTokenScaduto(
      `${import.meta.env.VITE_BACKEND_URL}/note-psicologo/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenuto: editContenuto }),
      }
    )

    setEditNoteId(null)
    setEditContenuto("")
    fetchNotePsicologo()
  }

  useEffect(() => {
    fetchPsicologo(),
      caricaCliente(),
      fetchUtenteCliente(),
      fetchNotePsicologo()
  }, [navigate])
  if (!cliente) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Spinner animation="border" variant="success" role="status"></Spinner>
        <span>Caricamento...</span>
      </div>
    )
  }

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />
      <Container>
        <Col>
          <Card className="py-3 text-center">
            <h2 className="h-verde">
              CLIENTE : {cliente?.nome} {cliente?.cognome}
            </h2>
            <p>
              <strong className="h-verde">Email </strong> {cliente?.email}
            </p>
          </Card>
        </Col>
        <Row className="justify-content-center">
          <Col lg={6} className="text-center">
            <div className="mt-3">
              {cliente ? (
                <>
                  <h4 className="mt-3 h-verde">Risposte al Questionario</h4>
                  <div className=" risposte-salvate">
                    {" "}
                    <Card className="p-3 mt-2 me-3 card ">
                      {Object.entries(risposte).map(([domandaId, risposte]) => {
                        const domanda = domande.find(
                          (d) => String(d.id) === domandaId
                        )

                        return (
                          <div key={domandaId} className="mb-3">
                            <strong>
                              {domanda ? domanda.testo : `Domanda ${domandaId}`}
                            </strong>
                            <ul className="mb-0 list-unstyled">
                              {risposte.map((r, idx) => (
                                <li key={idx}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </Card>
                  </div>
                </>
              ) : (
                <p>Caricamento in corso...</p>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <h4 className="my-3 h-verde">Ciao {psicologo?.nome}!</h4>
            <Form.Control
              as="textarea"
              rows={3}
              className="mb-2"
              placeholder={`Scrivi qui le note inerenti a ${cliente.nome} ${cliente.cognome}`}
              value={nuovaNota}
              onChange={(e) => setNuovaNota(e.target.value)}
            />
            <div className="text-end mt-3">
              <button
                disabled={nuovaNota.trim() === ""}
                onClick={salvaNota}
                className="button-green"
              >
                SALVA NOTA
              </button>
            </div>

            <h4 className="h-verde">Note Salvate</h4>
            <div className="note-container mt-4">
              {note.length === 0 ? (
                <p className="note-empty">Non ci sono ancora note salvate.</p>
              ) : (
                <ul className="note-list">
                  {note.map((nota) => (
                    <li key={nota.id} className="note-item">
                      <span className="note-date">
                        {new Date(nota.dataCreazione).toLocaleString()}
                      </span>

                      <div className="note-content">
                        {editNoteId === nota.id ? (
                          <>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              className="mb-2"
                              value={editContenuto}
                              onChange={(e) => setEditContenuto(e.target.value)}
                            />
                            <div className="note-footer">
                              <button
                                className="button-outline-green me-2"
                                onClick={() => aggiornaNota(nota.id)}
                              >
                                Salva
                              </button>
                              <button
                                className="button-outline-green"
                                onClick={() => setEditNoteId(null)}
                              >
                                Annulla
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="note-text">{nota.contenuto}</p>
                            <div className="note-footer">
                              <button
                                className="button-outline-green me-2"
                                onClick={() => {
                                  setEditNoteId(nota.id)
                                  setEditContenuto(nota.contenuto)
                                }}
                              >
                                Modifica
                              </button>
                              <button
                                className="button-outline-green"
                                onClick={() => eliminaNota(nota.id)}
                              >
                                Elimina
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ClienteDettaglio
