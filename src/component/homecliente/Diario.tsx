import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarClientePsico from "../NavbarClientePsico"
import SidebarCliente from "./SidebarCliente"
import { Container, Row, Col } from "react-bootstrap"
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
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10}>
            <h3 className="mb-4">Il mio diario</h3>

            <textarea
              className="form-control mb-2"
              rows={3}
              value={nuovaNota}
              onChange={(e) => setNuovaNota(e.target.value)}
              placeholder="Scrivi una nuova nota..."
            />
            <button className="btn btn-success mb-4" onClick={salvaNota}>
              Salva nota
            </button>

            <ul className="list-group">
              {note.map((nota) => (
                <li key={nota.id} className="list-group-item mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="w-100">
                      <small className="text-muted d-block mb-1">
                        {new Date(nota.dataCreazione).toLocaleString()}
                      </small>
                      {editNoteId === nota.id ? (
                        <>
                          <textarea
                            className="form-control mb-2"
                            rows={3}
                            value={editContenuto}
                            onChange={(e) => setEditContenuto(e.target.value)}
                          />
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => aggiornaNota(nota.id)}
                          >
                            Salva modifiche
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditNoteId(null)}
                          >
                            Annulla
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="mb-2">{nota.contenuto}</p>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => {
                              setEditNoteId(nota.id)
                              setEditContenuto(nota.contenuto)
                            }}
                          >
                            Modifica
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminaNota(nota.id)}
                          >
                            Elimina
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
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
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Vai al login ora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Diario
