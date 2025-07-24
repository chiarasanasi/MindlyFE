import { useState } from "react"
import { Row, Col, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "/src/css/Mindly.css"
import "/src/css/RegistrazioneLogin.css"
import NavBarMenu from "../../component/NavBarMenu"

const QuestionarioRegistrazione = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
    ruolo: "CLIENTE",
  })

  const [errore, setErrore] = useState<string>("")
  const campoNonValido = (valore: string) => valore.trim() === ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrore("")

    const { nome, cognome, email, username, password } = formData
    if (!nome || !cognome || !email || !username || !password) {
      setErrore("Per favore, compila tutti i campi obbligatori.")
      return
    }

    const body: any = { ...formData }

    const risposte = localStorage.getItem("risposteQuestionario")
    if (risposte) body.risposteQuestionario = JSON.parse(risposte)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/registrazione`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )

      if (!res.ok) {
        const errorJson = await res.json()
        setErrore(errorJson.message || "Errore nella registrazione.")
        return
      }

      console.log("Registrazione avvenuta con successo")
      navigate("/login")
    } catch (err) {
      console.error("Errore:", err)
      setErrore("Errore di connessione al server. Riprova.")
    }
  }

  return (
    <>
      <NavBarMenu />

      <div className="sfondo">
        <div className="background-overlay-registrazione -webkit-fill-available">
          <Row className="min-vh-100 flex-column flex-lg-row m-0">
            <Col
              lg={6}
              className="d-flex flex-column justify-content-center align-items-start p-4 order-1 order-lg-1  spazio-dalla-navbar"
            >
              <h2 className="fw-bold mb-4 h-verde testo-custom">
                IL PRIMO COLLOQUIO È GRATUITO !
              </h2>

              <ul className="list-unstyled">
                <li className="mb-2 lista-custom">
                  ✅ Scegli tu <strong>quando prenotare</strong>
                </li>
                <li className="mb-2 lista-custom">
                  ✅ Dopo il colloquio: a partire da <strong>49 €</strong>
                </li>
                <li className="mb-2 lista-custom">
                  ✅ Oppure <strong>cambia terapeuta</strong> gratis
                </li>
              </ul>

              <p className="mt-4 nota-custom">
                Non è un abbonamento: <strong>smetti quando vuoi.</strong>
              </p>
            </Col>

            <Col
              lg={6}
              className="bg-white d-flex align-items-center justify-content-center p-4 order-2 order-lg-2 spazio-dalla-navbar-form"
            >
              <div className="container">
                <Row className="justify-content-center">
                  <Col lg={10} xl={8}>
                    <h3 className="text-center h-verde fw-semibold mb-4">
                      REGISTRATI E ENTRA NELLA FAMIGLIA DI MINDLY!
                    </h3>

                    <p className="text-center mb-4">
                      Dopo la registrazione verrai reindirizzato alla pagina di
                      login dove potrai scoprire lo psicologo che ti è stato
                      assegnato!
                    </p>

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
                          isInvalid={
                            campoNonValido(formData.nome) && errore !== ""
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
                            setFormData({
                              ...formData,
                              cognome: e.target.value,
                            })
                          }
                          isInvalid={
                            campoNonValido(formData.cognome) && errore !== ""
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
                          isInvalid={
                            campoNonValido(formData.email) && errore !== ""
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
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          isInvalid={
                            campoNonValido(formData.username) && errore !== ""
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="form-custom">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          isInvalid={
                            campoNonValido(formData.password) && errore !== ""
                          }
                        />
                      </Form.Group>
                      {errore && (
                        <p
                          className="text-danger text-center mt-3"
                          role="alert"
                        >
                          {errore}
                        </p>
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default QuestionarioRegistrazione
