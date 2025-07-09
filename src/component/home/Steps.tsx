import "/src/css/Mindly.css"
import "/src/css/Steps.css"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const stepsData = [
  {
    numero: "01",
    titolo: "COMPILA IL QUESTIONARIO",
    descrizione:
      "Condividi i tuoi obiettivi, le tue necessità e preferenze: ci aiuterà a individuare il professionista più adatto al tuo percorso.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
      </svg>
    ),
  },
  {
    numero: "02",
    titolo: "SCOPRI IL TUO PSICOLOGO",
    descrizione:
      "Ti suggeriamo i profili più affini alle tue risposte, per aiutarti a fare una scelta consapevole e serena.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    ),
  },
  {
    numero: "03",
    titolo: "FISSA IL COLLOQUIO GRATUITO",
    descrizione:
      "Prenota facilmente un primo incontro conoscitivo, senza impegno e completamente gratuito.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282" />
      </svg>
    ),
  },
  {
    numero: "04",
    titolo: "INIZIA IL PERCORSO",
    descrizione:
      "Inizia il tuo cammino di crescita con il supporto del professionista che hai scelto.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7zm1 3V8H2l-.75 1L2 10zm0-5h6l.75-1L14 3H8z" />
      </svg>
    ),
  },
]

const Steps = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 py-3">
      <Row className="g-4 margine">
        {stepsData.map((step, index) => (
          <Col key={index} xs={12} md={6} lg={3}>
            <div className="step-wrapper">
              <div
                key={index}
                className="position-relative d-flex justify-content-center align-items-center flex-column"
              >
                <div className="circle-step mb-2">
                  <img
                    src="/img/circle.svg"
                    alt={`step ${step.numero}`}
                    className="circle-step-img"
                  />
                  <p className="circle-step-p">{step.numero}</p>
                </div>
                <Card className="card-step text-center">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="icon mb-3">{step.icon}</div>
                    <Card.Title className="titolo-card">
                      {step.titolo}
                    </Card.Title>
                    <Card.Text>{step.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Steps
