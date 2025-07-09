import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const HomeCliente = () => {
  const [psicologo, setPsicologo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPsicologo = async () => {
      const token = localStorage.getItem("token")

      try {
        const res = await fetch("http://localhost:8080/cliente/psicologo", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Errore nel recupero psicologo")

        const data = await res.json()
        setPsicologo(data)
      } catch (err) {
        console.error("Errore:", err)
        // puoi anche decidere di reindirizzare al login in caso di errore 401
        // navigate("/login")
      } finally {
        setLoading(false) // importantissimo!
      }
    }

    fetchPsicologo()
  }, [])

  if (loading) return <p className="text-center">Caricamento...</p>

  if (!psicologo)
    return (
      <p className="text-center">
        Al momento non ti è stato ancora assegnato uno psicologo.
      </p>
    )

  return (
    <div className="container mt-5 text-center">
      <h2>Il tuo psicologo</h2>
      <img
        src={psicologo.immagineProfilo}
        alt="Psicologo"
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <h4 className="mt-3">
        {psicologo.nome} {psicologo.cognome}
      </h4>
      <p className="fst-italic">{psicologo.specializzazione}</p>
    </div>
  )
}

export default HomeCliente
