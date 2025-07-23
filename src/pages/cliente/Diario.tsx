import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import { Container, Row, Col, Card, Form } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/Diario.css"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

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
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchCliente = async () => {
      try {
        const res = await fetchTokenScaduto(
          "http://localhost:8080/cliente/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error("Errore nel recupero cliente")

        const data = await res.json()
        setCliente(data)
      } catch (err) {
        console.error("Errore cliente:", err)
        // evita di proseguire in caso di errore
        setLoading(false)
        return
      }
      setLoading(false)
    }

    fetchCliente()
    fetchNote()
  }, [navigate])

  const fetchNote = async () => {
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/note`,
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

  const salvaNota = async () => {
    const res = await fetchTokenScaduto(
      `${import.meta.env.VITE_BACKEND_URL}/note`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenuto: nuovaNota }),
      }
    )

    if (res.ok) {
      setNuovaNota("")
      fetchNote()
    }
  }

  const eliminaNota = async (id: number) => {
    await fetchTokenScaduto(`${import.meta.env.VITE_BACKEND_URL}/note/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    fetchNote()
  }

  const aggiornaNota = async (id: number) => {
    await fetchTokenScaduto(`${import.meta.env.VITE_BACKEND_URL}/note/${id}`, {
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
  if (!cliente) return null

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />
      <Container className="mb-5">
        <Row className="justify-content-center mb-4 ">
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
    </>
  )
}

export default Diario
