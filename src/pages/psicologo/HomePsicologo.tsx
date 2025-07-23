import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import { Col, Container, Row } from "react-bootstrap"
import { jwtDecode } from "jwt-decode"
import "/src/css/Mindly.css"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"
import WelcomePsicologo from "../../component/homepsicologo/WelcomePsicologo"
import CalendarioPsicologo from "../../component/homepsicologo/CalendarioPsicologo"
import ListaClienti from "../../component/homepsicologo/ListaClienti"

const HomePsicologo = () => {
  interface DecodedToken {
    username: string
  }

  const token = localStorage.getItem("token")
  let username = ""

  if (token) {
    const decoded: DecodedToken = jwtDecode(token)
    username = decoded.username
  }

  const [psicologo, setPsicologo] = useState<any>(null)
  const [clienti, setClienti] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

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
      } finally {
        setLoading(false)
      }
    }

    const fetchClienti = async () => {
      try {
        const res = await fetchTokenScaduto(
          `${process.env.REACT_APP_BACKEND_URL}/psicologo/clienti`,
          {}
        )
        if (res.ok) {
          const data = await res.json()
          setClienti(data)
        }
      } catch (err) {
        console.error("Errore nel recupero clienti:", err)
      }
    }

    fetchPsicologo()
    fetchClienti()
  }, [navigate])

  if (loading) return <p className="text-center">Caricamento...</p>

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />

      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <WelcomePsicologo psicologo={psicologo} />
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="g-4">
            <Link
              className="linkcollegamento mb-3"
              to={`/psicologo/${username}/calendario`}
            >
              Calendario &gt;{" "}
            </Link>
            <CalendarioPsicologo psicologo={psicologo} />
          </Col>

          <Col lg={6} className="g-4">
            <Link
              className="linkcollegamento"
              to={`/psicologo/${username}/clienti`}
            >
              I miei clienti &gt;{" "}
            </Link>
            <ListaClienti clienti={clienti} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePsicologo
