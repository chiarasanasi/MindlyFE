import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/Domande.css"
import { useNavigate } from "react-router-dom"

import "/src/css/Mindly.css"
import "/src/css/Domande.css"

const domande = [
  {
    id: 1,
    tipo: "aperta",
    testo: "Iniziamo con le presentazioni, come ti chiami?",
    obbligatoria: true,
  },
  {
    id: 1.1,
    tipo: "sceltaSingola",
    testo: "In quale genere ti identifichi?",
    descrizione:
      'Puoi consultare questo glossario per approfondire: <a href="https://www.hrc.org/resources/glossary-of-terms" target="_blank" rel="noopener noreferrer">Glossario HRC</a> (fonte: Human Rights Campaign)',
    opzioni: [
      "Donna",
      "Uomo",
      "Non binario",
      "Preferisco non rispondere",
      "Agender",
      "Bigender",
      "Genderqueer o genderfluid",
      "Non lo so",
    ],
  },
  {
    id: 100,
    tipo: "welcome",
    testo: "",
  },
  {
    id: 2,
    tipo: "sceltaSingola",
    testo: "Quale percorso ti interessa?",
    descrizione:
      "Ci servirà per capire chi parteciperà alle sedute con il professionista Mindly",
    opzioni: ["Individuale", "Di coppia", "Per un/a minore"],
  },
  {
    id: 3,
    tipo: "aperta",
    testo: "Quanti anni hai?",
    descrizione:
      "Se sei minorenne, per legge dobbiamo avere il consenso di entrambi i genitori per proseguire.",
  },
  {
    id: 4,
    tipo: "sceltaSingola",
    testo: "Cosa ti porta qui?",
    opzioni: [
      "Provo spesso ansia o stress",
      "Mi sento spesso triste",
      "Vivo difficoltà connesse alla mia esperienza di vita all'estero",
      "Ho difficoltà correlate alla mia vita lavorativa",
      "Sento di non avere una vita affettiva serena (partner, familiari o amici)",
      "Sento il bisogno di un percorso di crescita personale",
      "Nessuna di queste",
    ],
  },
  {
    id: 5,
    tipo: "sceltaMultipla",
    testo: "Ti riconosci in qualcuna di queste risposte?",
    descrizione: "Puoi selezionare più di una risposta",
    opzioni: [
      "Non ho un buon rapporto con il cibo o con il mio corpo",
      "Vorrei risolvere alcune problematiche legate alla sfera sessuale",
      "Sento di aver sviluppato una dipendenza",
      "Ho vissuto un evento scioccante o spaventoso che fatico a superare",
      "Ho bisogno di vedere le cose da un'altra prospettiva o credere di più in me",
      "Soffro a causa di problematiche fisiche o mediche mie o di una persona cara",
      "Nessuna di queste",
    ],
  },
  {
    id: 6,
    tipo: "sceltaMultipla",
    testo: "Come descriveresti quello che senti?",
    descrizione: "Puoi selezionare più di una risposta",
    opzioni: [
      "Vorrei conoscermi meglio",
      "Credo di avere una bassa autostima e vorrei migliorarla",
      "Sento di aver bisogno di una svolta",
      "Ci sono cose del mio passato che non capisco o non riesco ad accettare e andare avanti",
      "Non so che direzione prendere in questa fase della mia vita",
      "Nessuna di queste",
    ],
  },
  {
    id: 7,
    tipo: "sceltaMultipla",
    testo: "Scegli le opzioni che descrivono quello che senti",
    descrizione: "Puoi selezionare più di una risposta",
    opzioni: [
      "Vorrei conoscermi meglio",
      "Non riesco a prendere alcune decisioni sulla mia vita",
      "Credo che le mie difficoltà siano principalmente legate a questioni lavorative",
      "Credo che le mie difficoltà siano principalmente legate alla mia vita all'estero",
      "Vorrei migliorare la mia autostima e la percezione che ho di me",
      "È da un po' che vorrei fare terapia e credo sia arrivato il momento",
      "Nessuna di queste",
    ],
  },
  {
    id: 8,
    tipo: "sceltaMultipla",
    testo: "Quali aspetti della tua vita ne sono influenzati?",
    descrizione: "Puoi selezionare più di una risposta",
    opzioni: [
      "Lavoro e/o studio",
      "Relazioni sociali",
      "Sonno",
      "Emotività",
      "Salute fisica",
      "Non saprei",
    ],
  },
  {
    id: 9,
    tipo: "sceltaSingola",
    testo: "Da quanto tempo senti la necessità di un supporto psicologico?",
    opzioni: [
      "Da meno di un mese",
      "Da uno a sei mesi",
      "Da almeno sei mesi",
      "Da più di un anno",
      "Non ricordo con precisione",
    ],
  },
  {
    id: 10,
    tipo: "aperta",
    testo: "Cosa ti ha spinto a cercare un supporto proprio ora?",
    descrizione: "Se preferisci puoi saltare questa domanda",
  },
  {
    id: 11,
    tipo: "sceltaSingola",
    testo: "Hai mai fatto terapia?",
    opzioni: [
      "Sì, in passato",
      "Sì, sono attualmente in terapia",
      "No, è la prima volta",
    ],
  },
  {
    id: 12,
    tipo: "sceltaMultipla",
    testo:
      "Hai qualche dubbio o pensiero riguardo la possibilità di intraprendere un percorso psicologico?",
    descrizione: "Puoi selezionare più di una risposta",
    opzioni: [
      "Non so bene cosa aspettarmi",
      "Ho paura che mi si giudichi o fraintenda",
      "Mi preoccupa condividere informazioni personali",
      "Non so se la terapia potrà davvero aiutarmi",
      "Mi preoccupa l'impegno di tempo o la gestione degli appuntamenti",
      "Ho dei dubbi legati al costo",
      "Nessuna di queste",
    ],
  },
  {
    id: 13,
    tipo: "aperta",
    testo: "Se vuoi puoi aggiungere più informazioni",
    descrizione:
      "Saranno lette solo dallo psicologo che ti verrà assegnato alla fine del questionario",
  },
  {
    id: 14,
    tipo: "sceltaSingola",
    testo: "Hai preferenze sul genere del tuo psicologo?",
    opzioni: [
      "Preferirei fosse uomo",
      "Preferirei fosse donna",
      "Vorrei fosse il più adatto a sostenermi",
    ],
  },
  {
    id: 15,
    tipo: "sceltaSingola",
    testo: "Hai preferenze di età?",
    opzioni: [
      "Preferirei avesse più di 35 anni",
      "Preferirei avesse meno di 35 anni",
      "Vorrei fosse il più adatto a sostenermi",
    ],
  },
  {
    id: 16,
    tipo: "sceltaSingola",
    testo: "Come comunichi quando parli di temi personali?",
    opzioni: [
      "Tendo a essere molto diretto e ad esprimere chiaramente ciò che provo",
      "Ho bisogno di tempo per elaborare le mie emozioni prima di parlarne",
      "Preferisco esprimermi attraverso la scrittura o altri mezzi non verbali",
      "A volte mi blocco e faccio fatica a descrivere ciò che sento",
      "Non saprei",
    ],
  },
  {
    id: 17,
    tipo: "sceltaMultipla",
    testo: "Quali orari preferisci per organizzare le sedute?",
    descrizione:
      "Puoi selezionare una o più opzioni nel fuso orario: ITALIA - cambia fuso orario",
    opzioni: [
      "Adesso non saprei, preferisco organizzarmi dopo con lo psicologo",
      "Mattina 08:30 - 13:00",
      "Pomeriggio 13:00 - 18:00",
      "Sera 18:00 - 22:00",
    ],
  },
]

function Domande() {
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState<{ [key: number]: any }>({})
  const [valoreCorrente, setValoreCorrente] = useState<string | string[]>("")
  const [errore, setErrore] = useState<string>("")

  const navigate = useNavigate()

  const domanda = domande[indice]
  const nomeUtente = risposte[1]

  const handleProsegui = () => {
    setErrore("")

    if (domanda.tipo === "welcome") {
      setIndice((prev) => prev + 1)
      return
    }

    const rispostaObbligatoria =
      domanda.tipo !== "aperta" || domanda.obbligatoria === true

    const haRisposto =
      (Array.isArray(valoreCorrente) && valoreCorrente.length > 0) ||
      (!Array.isArray(valoreCorrente) && valoreCorrente !== "")

    if (rispostaObbligatoria && !haRisposto) {
      setErrore("Per favore, rispondi alla domanda prima di continuare.")
      return
    }

    const nuoveRisposte = {
      ...risposte,
      [domanda.id]: Array.isArray(valoreCorrente)
        ? valoreCorrente
        : [valoreCorrente],
    }
    setRisposte(nuoveRisposte)
    setValoreCorrente("")
    setErrore("")

    const ultimaDomanda = indice === domande.length - 1

    if (ultimaDomanda) {
      localStorage.setItem("ruolo", "CLIENTE")
      localStorage.setItem(
        "risposteQuestionario",
        JSON.stringify(nuoveRisposte)
      )
      navigate("/questionario/registrazione")
    } else {
      setIndice((prev) => prev + 1)
    }
  }

  const renderDomanda = () => {
    if (domanda.tipo === "welcome") {
      return (
        <h3 className="domanda">
          Ciao {nomeUtente}, iniziamo il tuo questionario Mindly{" "}
        </h3>
      )
    }

    return (
      <>
        <div className="d-flex flex-column ">
          <h4 className="domanda text-center">{domanda.testo}</h4>
          {domanda.descrizione && (
            <p
              className="descrizione text-center"
              dangerouslySetInnerHTML={{ __html: domanda.descrizione }}
            ></p>
          )}

          {domanda.tipo === "aperta" && (
            <Form.Control
              className="campo-form"
              placeholder={
                domanda.id === 3
                  ? "Quanti anni hai..."
                  : "Scrivi qui la tua risposta..."
              }
              type={domanda.id === 3 ? "number" : "text"}
              value={valoreCorrente as string}
              onChange={(e) => setValoreCorrente(e.target.value)}
            />
          )}

          {domanda.tipo === "sceltaSingola" && (
            <>
              <Row className="justify-content-center">
                <Col lg={6}>
                  {domanda.opzioni?.map((opzione) => (
                    <Form.Check
                      key={opzione}
                      type="radio"
                      name={`domanda-${domanda.id}`}
                      label={opzione}
                      checked={valoreCorrente === opzione}
                      onChange={() => setValoreCorrente(opzione)}
                    />
                  ))}
                </Col>
              </Row>
            </>
          )}
          {domanda.tipo === "sceltaMultipla" && (
            <>
              <Row className="justify-content-center">
                <Col lg={6}>
                  {domanda.opzioni?.map((opzione) => (
                    <Form.Check
                      key={opzione}
                      type="checkbox"
                      name={`domanda-${domanda.id}`}
                      label={opzione}
                      checked={
                        Array.isArray(valoreCorrente) &&
                        valoreCorrente.includes(opzione)
                      }
                      onChange={(e) => {
                        const nuovaLista = Array.isArray(valoreCorrente)
                          ? [...valoreCorrente]
                          : []
                        if (e.target.checked) {
                          nuovaLista.push(opzione)
                        } else {
                          const index = nuovaLista.indexOf(opzione)
                          if (index > -1) nuovaLista.splice(index, 1)
                        }
                        setValoreCorrente(nuovaLista)
                      }}
                    />
                  ))}
                </Col>
              </Row>
            </>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="container spazio-dalla-navbar">
      <Row className="justify-content-center">
        <Col lg={6} className="mt-lg-5 pt-lg-5">
          {renderDomanda()}
          {errore && (
            <p className="text-danger text-center mt-3" role="alert">
              {errore}
            </p>
          )}
          <div className="mt-4 text-center ">
            <button onClick={handleProsegui} className="button-green">
              CONTINUA..
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Domande
