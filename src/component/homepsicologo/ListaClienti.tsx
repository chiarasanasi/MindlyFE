import React from "react"
import "/src/css/ListaClienti.css"

const ListaClienti = (props) => {
  const { clienti } = props

  return (
    <div className="mini-diario my-3">
      <h4 className="h-verde">Clienti assegnati</h4>
      {clienti.length === 0 ? (
        <p>Nessun cliente assegnato.</p>
      ) : (
        <ol className="scrollable-list">
          {clienti.map((c, index) => (
            <li key={index} className="nota-utente">
              <p>
                {c.nome} {c.cognome}
              </p>
              <p>
                <em>{c.motivo}</em>
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default ListaClienti
