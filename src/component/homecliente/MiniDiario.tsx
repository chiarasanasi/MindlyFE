import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "/src/css/Mindly.css"
import "/src/css/MiniDiario.css"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

interface Nota {
  id: number
  contenuto: string
  dataCreazione: string
}

const MiniDiario = () => {
  const [note, setNote] = useState<Nota[]>([])
  const username = localStorage.getItem("username")

  const fetchNote = async () => {
    const res = await fetchTokenScaduto("http://localhost:8080/note", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (res.ok) {
      const data = await res.json()
      setNote(data)
    }
  }

  useEffect(() => {
    fetchNote()
  }, [])

  return (
    <div className="mini-diario my-3">
      <h5 className="mini-diario-title">📓 Le tue ultime note</h5>

      {note.length === 0 ? (
        <p className="mini-diario-empty">Nessuna nota trovata.</p>
      ) : (
        <ul className="mini-diario-list">
          {note.slice(0, 5).map((n) => (
            <li key={n.id} className="mini-diario-item">
              <small className="mini-diario-date">
                {new Date(n.dataCreazione).toLocaleString()}
              </small>
              <div className="mini-diario-content">
                <p className="mini-diario-text">{n.contenuto}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mini-diario-footer">
        <Link
          to={`/cliente/${username}/diario`}
          className="button-green text-decoration-none"
        >
          VAI AL DIARIO
        </Link>
      </div>
    </div>
  )
}

export default MiniDiario
