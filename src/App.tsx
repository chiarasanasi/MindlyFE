import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/default/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import "@coreui/coreui/dist/css/coreui.min.css"
import Questionario from "./pages/default/Questionario"
import RegistrazioneLogin from "./pages/default/RegistrazioneLogin"
import Login from "./pages/default/Login"
import Registrazione from "./pages/default/Registrazione"
import HomeCliente from "./pages/cliente/HomeCliente"
import HomePsicologo from "./pages/psicologo/HomePsicologo"
import QuestionarioRegistrazione from "./pages/default/QuestionarioRegistrazione"
import Diario from "./pages/cliente/Diario"
import CalendarioCliente from "./pages/cliente/CalendarioCliente"
import Psicologo from "./component/homecliente/Psicologo"
import { useEffect } from "react"
import BlogDettaglio from "./pages/default/BlogDettaglio"
import CalendarioPsicologoPagina from "./pages/psicologo/CalendarioPsicologoPagina"
import MieiClienti from "./pages/psicologo/MieiClienti"
import ClienteDettaglio from "./pages/psicologo/ClienteDettaglio"
import { registerTriggerExpiredModal } from "./utilities/fetchTokenScaduto"
import { useAuth } from "./utilities/AuthContext"
import NotFound from "./pages/default/NotFound"
import ScrollaInAlto from "./utilities/ScrollaInAlto"

const App = () => {
  const { mostraModaleScadenza, attivaModaleScadenza } = useAuth()

  useEffect(() => {
    registerTriggerExpiredModal(attivaModaleScadenza)
  }, [attivaModaleScadenza])

  useEffect(() => {
    if (mostraModaleScadenza) {
      const timeout = setTimeout(() => {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [mostraModaleScadenza])
  // console.log("mostraModaleScadenza:", mostraModaleScadenza)

  return (
    <>
      <Router>
        <ScrollaInAlto />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionario" element={<Questionario />} />
          <Route
            path="/questionario/registrazione"
            element={<QuestionarioRegistrazione />}
          />
          <Route
            path="/registrazione-o-login"
            element={<RegistrazioneLogin />}
          />
          <Route path="/blog/:slug" element={<BlogDettaglio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/cliente/:username/home" element={<HomeCliente />} />
          <Route path="/cliente/:username/diario" element={<Diario />} />
          <Route
            path="/cliente/:username/calendario"
            element={<CalendarioCliente />}
          />
          <Route path="/cliente/:username/psicologo" element={<Psicologo />} />
          <Route path="/psicologo/:username/home" element={<HomePsicologo />} />
          <Route
            path="/psicologo/:username/clienti"
            element={<MieiClienti />}
          />
          <Route
            path="/psicologo/:username/calendario"
            element={<CalendarioPsicologoPagina />}
          />
          <Route
            path="/psicologo/:username/clienti/:usernameCliente"
            element={<ClienteDettaglio />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {mostraModaleScadenza && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
              <div className="modal-header flex-column">
                <img
                  src="/img/Logo_Lungo.svg"
                  alt="Logo"
                  className=" m-0 mb-3"
                  width={150}
                />
                <h5 className="modal-title h-verde">SESSIONE SCADUTA</h5>
              </div>
              <div className="modal-body">
                <p className="text-center">
                  Per continuare, effettua di nuovo il login. La tua sessione è
                  scaduta o non valida.
                </p>
                <p className="h-verde text-center fw-bold">
                  Verrai reindirizzato tra pochi secondi...
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  className="button-green "
                  onClick={() => (window.location.href = "/login")}
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

export default App
