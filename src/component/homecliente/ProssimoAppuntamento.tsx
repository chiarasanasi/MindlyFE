import "/src/css/Mindly.css"
import "/src/css/Welcome.css"

type Props = {
  cliente: any
}

const ProssimoAppuntamento = ({ cliente }: Props) => {
  if (!cliente) return null

  return (
    <>
      <h2>CIAO</h2>
    </>
  )
}

export default ProssimoAppuntamento
