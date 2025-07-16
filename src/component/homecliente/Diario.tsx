import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarClientePsico from "../NavbarClientePsico"
import SidebarCliente from "./SidebarCliente"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/Diario.css"

interface Nota {
  id: number
  contenuto: string
  dataCreazione: string
}

const Diario = () => {
  const [cliente, setCliente] = useState<any>(null)
  const [note, setNote] = useState<Nota[]>([])
  const [nuovaNota, setNuovaNota] = useState("")
  const [editNoteId, setEditNoteId] = useState<number | null>(null)
  const [editContenuto, setEditContenuto] = useState("")
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchCliente = async () => {
      try {
        const res = await fetch("http://localhost:8080/cliente/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Errore nel recupero cliente")

        const data = await res.json()
        setCliente(data)
      } catch (err) {
        console.error("Errore cliente:", err)
        setShowModal(true)
        setTimeout(() => navigate("/login"), 3000)
      } finally {
        setLoading(false)
      }
    }

    fetchCliente()
    fetchNote()
  }, [navigate])

  const fetchNote = async () => {
    const res = await fetch("http://localhost:8080/note", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (res.ok) {
      const data = await res.json()
      setNote(data)
    }
  }

  const salvaNota = async () => {
    const res = await fetch("http://localhost:8080/note", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contenuto: nuovaNota }),
    })

    if (res.ok) {
      setNuovaNota("")
      fetchNote()
    }
  }

  const eliminaNota = async (id: number) => {
    await fetch(`http://localhost:8080/note/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    fetchNote()
  }

  const aggiornaNota = async (id: number) => {
    await fetch(`http://localhost:8080/note/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contenuto: editContenuto }),
    })

    setEditNoteId(null)
    setEditContenuto("")
    fetchNote()
  }

  if (loading) return <p className="text-center">Caricamento...</p>

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente cliente={cliente} />
      <Container className="mt-4 mb-5">
        <Row className="justify-content-center mb-4 spazio-dalla-navbar">
          <Col lg={12}>
            <h4 className="mb-3 h-verde">Ciao {cliente.nome}, come stai?</h4>
            <Form.Control
              as="textarea"
              rows={3}
              className="mb-2"
              placeholder="Scrivi qualcosa..."
              value={nuovaNota}
              onChange={(e) => setNuovaNota(e.target.value)}
            />
            <div className="text-end">
              <button
                disabled={nuovaNota.trim() === ""}
                onClick={salvaNota}
                className="button-green"
              >
                SALVA NOTA
              </button>
            </div>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={2} className="g-4">
          {note.map((nota) => (
            <Col key={nota.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <small className="text-muted card-diario">
                    {new Date(nota.dataCreazione).toLocaleString()}
                  </small>

                  {editNoteId === nota.id ? (
                    <>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="my-3"
                        value={editContenuto}
                        onChange={(e) => setEditContenuto(e.target.value)}
                      />
                      <div className="d-flex justify-content-end">
                        <button
                          className="me-2 button-outline-green"
                          onClick={() => aggiornaNota(nota.id)}
                        >
                          Salva
                        </button>
                        <button
                          onClick={() => setEditNoteId(null)}
                          className="me-2 button-outline-green"
                        >
                          Annulla
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card.Text className="mt-2 mb-3">
                        {nota.contenuto}
                      </Card.Text>
                      <div className="d-flex justify-content-end">
                        <button
                          className="button-outline-green"
                          onClick={() => {
                            setEditNoteId(nota.id)
                            setEditContenuto(nota.contenuto)
                          }}
                        >
                          Modifica
                        </button>
                        <button
                          onClick={() => eliminaNota(nota.id)}
                          className="button-outline-green mx-3"
                        >
                          Elimina
                        </button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sessione scaduta</h5>
              </div>
              <div className="modal-body">
                <p>
                  Per continuare, effettua di nuovo il login. La tua sessione
                  potrebbe essere scaduta o non valida.
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Vai al login ora
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Diario
