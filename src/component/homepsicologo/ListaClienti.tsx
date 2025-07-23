import "/src/css/ListaClienti.css"

interface Cliente {
  id: number
  nome: string
  cognome: string
  motivo: string
}

interface ListaClientiProps {
  clienti: Cliente[]
}

const ListaClienti = ({ clienti }: ListaClientiProps) => {
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
