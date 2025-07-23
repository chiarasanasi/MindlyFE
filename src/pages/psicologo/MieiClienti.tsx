import { useEffect, useState } from "react"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"
import { useNavigate } from "react-router-dom"
import { Container, Row } from "react-bootstrap"
import SidebarCliente from "../../component/Sidebar"
import NavBarClientePsico from "../../component/NavbarClientePsico"

const MieiClienti = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")

  const [clienti, setClienti] = useState([])

  const caricaClienti = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/psicologo/clienti`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error("Errore nel caricamento clienti")
      const data = await res.json()
      setClienti(data)
    } catch (err) {
      console.error("Errore caricamento clienti:", err)
    }
  }

  useEffect(() => {
    caricaClienti()
  }, [])

  return (
    <>
      <NavBarClientePsico />
      <SidebarCliente />

      <Container>
        <Row className="justify-content-center">
          <div className="container mt-4">
            <h2 className="mb-4 text-center">I tuoi clienti</h2>

            {clienti.length === 0 ? (
              <p>Nessun cliente assegnato.</p>
            ) : (
              <div className="d-flex flex-column flex-md-row flex-lg-row flex-wrap">
                {clienti.map((c: any) => (
                  <div className="col text-center m-3" key={c.username}>
                    <div
                      className="card h-100 shadow-sm"
                      onClick={() =>
                        navigate(`/psicologo/${username}/clienti/${c.username}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {c.nome} {c.cognome}
                        </h5>
                        <p className="card-text">📧 {c.email}</p>
                        <p className="card-text">Età: {c.eta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Row>
      </Container>
    </>
  )
}

export default MieiClienti
