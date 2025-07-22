import "/src/css/Mindly.css"
import "/src/css/Welcome.css"

type Props = {
  cliente: any
}

const WelcomeUtente = ({ cliente }: Props) => {
  if (!cliente) return null

  return (
    <>
      <div className="text-center banner">
        <p className="p-3 m-0 h-verde">Ciao, {cliente.nome}, come stai?</p>
        <h3 className="pb-4 m-0 h-verde">
          Meriti del tempo per te. Inizia da oggi.
        </h3>
      </div>
    </>
  )
}

export default WelcomeUtente
