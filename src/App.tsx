import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import "@coreui/coreui/dist/css/coreui.min.css"
import Questionario from "./pages/Questionario"
import RegistrazioneLogin from "./pages/RegistrazioneLogin"
import Login from "./pages/Login"
import Registrazione from "./pages/Registrazione"
import HomeCliente from "./pages/HomeCliente"
import HomePsicologo from "./pages/HomePsicologo"
import QuestionarioRegistrazione from "./pages/QuestionarioRegistrazione"
import Diario from "./component/homecliente/Diario"
import Calendario from "./component/homecliente/Calendario"
import CalendarioCliente from "./pages/CalendarioCliente"

const App = () => {
  return (
    <>
      <Router>
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
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />

          <Route path="/cliente/:username/home" element={<HomeCliente />} />
          <Route path="/psicologo/:username/home" element={<HomePsicologo />} />
          <Route path="/cliente/:username/diario" element={<Diario />} />
          <Route
            path="/cliente/:username/calendario"
            element={<CalendarioCliente />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
