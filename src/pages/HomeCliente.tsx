import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarClientePsico from "../component/NavbarClientePsico"
import SidebarCliente from "../component/homecliente/SidebarCliente"
import WelcomeUtente from "../component/homecliente/WelcomeUtente"
import { Col, Container, Row } from "react-bootstrap"
import MiniDiario from "../component/homecliente/MiniDiario"
import Calendario from "../component/homecliente/Calendario"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import "/src/css/Mindly.css"
import "/src/css/Calendario.css"

const HomeCliente = () => {
  interface DecodedToken {
    username: string
  }

  const token = localStorage.getItem("token")
  let username = ""

  if (token) {
    const decoded: DecodedToken = jwtDecode(token)
    username = decoded.username
  }

  const [cliente, setCliente] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [note, setNote] = useState<Nota[]>([])
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
        console.log("DATI DEL CLIENTE", data)
      } catch (err) {
        console.error("Errore cliente:", err)
        setShowModal(true)
        setTimeout(() => navigate("/login"), 3000)
      } finally {
        setLoading(false)
      }
    }
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

    fetchCliente(), fetchNote()
  }, [navigate])

  if (loading) return <p className="text-center">Caricamento...</p>

  if (!cliente?.psicologo)
    return (
      <p className="text-center">
        Non riusciamo a raggiungere il tuo psicologo.
      </p>
    )

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente cliente={cliente} />
      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <WelcomeUtente cliente={cliente} />
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="g-4">
            <Link
              className="linkcollegamento"
              to={`/cliente/${username}/calendario`}
            >
              Calendario &gt;{" "}
            </Link>
            <Calendario />
          </Col>
          <Col lg={6} className="g-4">
            <Link
              className="linkcollegamento"
              to={`/cliente/${username}/diario`}
            >
              Diario &gt;{" "}
            </Link>
            <MiniDiario />
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

export default HomeCliente
