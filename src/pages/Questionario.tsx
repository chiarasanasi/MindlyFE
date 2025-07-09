import NavBarMenu from "../component/NavBarMenu"
import Domande from "../component/questionario/Domande"

const Questionario = () => {
  return (
    <>
      <div className="questionario-sfondo">
        <div className="background-overlay-questionario">
          <NavBarMenu />
          <Domande />
        </div>
      </div>
    </>
  )
}

export default Questionario
