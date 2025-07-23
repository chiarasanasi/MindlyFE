import { Spinner } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/Welcome.css"

interface Psicologo {
  nome: string
}

interface WelcomePsicologoProps {
  psicologo: Psicologo
}

const WelcomePsicologo = ({ psicologo }: WelcomePsicologoProps) => {
  if (!psicologo) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Spinner animation="border" variant="success" role="status"></Spinner>
        <span>Caricamento...</span>
      </div>
    )
  }

  return (
    <>
      <div className="banner text-center py-3">
        <h2 className="h-verde">Ciao, {psicologo.nome}!</h2>
        <p className="h-verde">
          Benvenut* nella tua area riservata. Qui puoi consultare gli
          appuntamenti e vedere i tuoi clienti.
        </p>
      </div>
    </>
  )
}

export default WelcomePsicologo
