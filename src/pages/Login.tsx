import { useState } from "react"
import { Row, Col, Form, Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "/src/css/Mindly.css"
import "/src/css/RegistrazioneLogin.css"
import NavBarMenu from "../component/NavBarMenu"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const body: any = { ...formData }

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error("Errore nel Login")

      const token = await res.text()
      localStorage.setItem("token", token)

      const ruolo = parseJwt(token).ruolo
      localStorage.setItem("ruolo", ruolo)

      const nomeUtente = formData.username
      localStorage.setItem("username", nomeUtente)

      if (ruolo === "CLIENTE") {
        navigate(`/cliente/${nomeUtente}/home`)
      } else if (ruolo === "PSICOLOGO") {
        navigate(`/psicologo/${nomeUtente}/home`)
      }

      console.log("Login avvenuto con successo. Benvenut* " + formData.username)
    } catch (err) {
      console.error("Errore:", err)
    }
  }

  return (
    <>
      <div className="sfondo">
        <div className="background-overlay">
          <NavBarMenu />

          <div className="container py-5 spazio-dalla-navbar">
            <Row className="justify-content-center">
              <Col lg={6}>
                <h3 className="text-center h-verde fw-semibold mb-4">LOGIN!</h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Il tuo username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="La tua email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="La tua Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <div className="text-center">
                    <button className="button-green mt-3" type="submit">
                      LOGIN
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )

    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error("Token non valido", e)
    return {}
  }
}
