import { useState } from "react"
import { Row, Col, Form, Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "/src/css/Mindly.css"
import "/src/css/RegistrazioneLogin.css"
import NavBarMenu from "../component/NavBarMenu"

const Registrazione = () => {
  const navigate = useNavigate()
  const ruoloDaStorage = localStorage.getItem("ruolo") || ""
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    ruolo: ruoloDaStorage,
    specializzazione: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const body: any = { ...formData }

    if (formData.ruolo === "CLIENTE") {
      const risposte = localStorage.getItem("risposteQuestionario")
      if (risposte) body.risposteQuestionario = JSON.parse(risposte)
    }

    try {
      const res = await fetch("http://localhost:8080/auth/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error("Errore nella registrazione")

      console.log("Registrazione avvenuta con successo")
      navigate("/login")
    } catch (err) {
      console.error("Errore:", err)
    }
  }

  const handleRuoloChange = (nuovoRuolo: string) => {
    if (nuovoRuolo === "CLIENTE") {
      const risposte = localStorage.getItem("risposteQuestionario")
      if (!risposte) {
        setShowModal(true)
        return
      }
    }
    setFormData({ ...formData, ruolo: nuovoRuolo })
  }

  return (
    <>
      <div className="sfondo">
        <div className="background-overlay">
          <NavBarMenu />

          <div className="container py-5 spazio-dalla-navbar">
            <Row className="justify-content-center">
              <Col lg={6}>
                <h3 className="text-center h-verde fw-semibold mb-4">
                  REGISTRATI E FINALMENTE ENTRERAI A FAR PARTE DELLA FAMIGLIA DI
                  MINDLY!
                </h3>

                {formData.ruolo === "CLIENTE" ? (
                  <h5 className="text-center mb-4">
                    Dopo la registrazione verrai reindirizzato alla pagina di
                    login dove potrai scoprire lo psicologo che ti è stato
                    assegnato!
                  </h5>
                ) : formData.ruolo === "PSICOLOGO" ? (
                  <h5 className="text-center mb-4">
                    Dopo la registrazione potrai accedere alla tua area
                    riservata come professionista.
                  </h5>
                ) : null}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Il tuo nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Il tuo cognome"
                      value={formData.cognome}
                      onChange={(e) =>
                        setFormData({ ...formData, cognome: e.target.value })
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
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>

                  {!ruoloDaStorage && (
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="radio"
                        label="Cliente"
                        name="ruolo"
                        checked={formData.ruolo === "CLIENTE"}
                        onChange={() => handleRuoloChange("CLIENTE")}
                      />
                      <Form.Check
                        type="radio"
                        label="Psicologo"
                        name="ruolo"
                        checked={formData.ruolo === "PSICOLOGO"}
                        onChange={() => handleRuoloChange("PSICOLOGO")}
                      />
                    </Form.Group>
                  )}

                  {formData.ruolo === "PSICOLOGO" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Specializzazione</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Es. disturbi alimentari, stress, ansia..."
                        value={formData.specializzazione}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specializzazione: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  )}

                  <div className="text-center">
                    <button
                      className="button-green mt-3"
                      type="submit"
                      onClick={() => {
                        navigate("/login")
                      }}
                    >
                      REGISTRATI
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* MODALE */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          navigate("/questionario")
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Questionario obbligatorio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Per registrarti come Cliente è necessario compilare prima il
          questionario. Verrai reindirizzato automaticamente.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false)
              navigate("/questionario")
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Registrazione
