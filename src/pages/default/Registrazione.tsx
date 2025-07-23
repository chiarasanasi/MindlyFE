import { useState, useEffect } from "react"
import { Row, Col, Form, Modal, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "/src/css/Mindly.css"
import "/src/css/RegistrazioneLogin.css"
import NavBarMenu from "../../component/NavBarMenu"
import { useRef } from "react"

const Registrazione = () => {
  localStorage.clear()
  const navigate = useNavigate()
  const alertRef = useRef<HTMLDivElement>(null)
  const ruoloDaStorage = localStorage.getItem("ruolo") || ""
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [specializzazioni, setSpecializzazioni] = useState<string[]>([])

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
    ruolo: ruoloDaStorage,
    specializzazione: [] as string[],
    descrizione: "",
  })

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`${process.env._BACKEND_URL}/tags`)
        const data = await res.json()
        setSpecializzazioni(data.map((tag: any) => tag.nome))
      } catch (err) {
        console.error("Errore nel caricamento tag:", err)
      }
    }
    fetchTags()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (
      !formData.nome.trim() ||
      !formData.cognome.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      (formData.ruolo === "PSICOLOGO" && formData.specializzazione.length === 0)
    ) {
      setErrorMessage("Compila tutti i campi obbligatori.")
      return
    }

    const body: any = {
      ...formData,
      specializzazione: formData.specializzazione.join(", "),
    }

    if (formData.ruolo === "CLIENTE") {
      const risposte = localStorage.getItem("risposteQuestionario")
      if (risposte) body.risposteQuestionario = JSON.parse(risposte)
    }

    try {
      const res = await fetch(
        `${process.env._BACKEND_URL}/auth/registrazione`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.message || "Errore nella registrazione")
        setTimeout(() => {
          alertRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }, 100)
        return
      }

      console.log("Registrazione avvenuta con successo")
      console.log(formData)
      localStorage.clear()
      navigate("/login")
    } catch (err) {
      console.error("Errore:", err)
      setErrorMessage("Errore imprevisto durante la registrazione")
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

  const toggleSpecializzazione = (val: string) => {
    setFormData((prev) => {
      const selected = prev.specializzazione.includes(val)
        ? prev.specializzazione.filter((s) => s !== val)
        : [...prev.specializzazione, val]
      return { ...prev, specializzazione: selected }
    })
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

                {errorMessage && (
                  <Alert
                    ref={alertRef}
                    variant="danger"
                    className="text-center"
                  >
                    {errorMessage}
                  </Alert>
                )}

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
                      <Form.Label>Specializzazioni</Form.Label>
                      {specializzazioni.map((tag) => (
                        <Form.Check
                          key={tag}
                          type="checkbox"
                          label={tag}
                          checked={formData.specializzazione.includes(tag)}
                          onChange={() => toggleSpecializzazione(tag)}
                        />
                      ))}
                    </Form.Group>
                  )}

                  {formData.ruolo === "PSICOLOGO" && (
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Presentati con una breve descrizione
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Scrivi qualcosa su di te, esperienze, approccio terapeutico..."
                        value={formData.descrizione}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descrizione: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  )}

                  <div className="text-center">
                    <button className="button-green mt-3" type="submit">
                      REGISTRATI
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>

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
