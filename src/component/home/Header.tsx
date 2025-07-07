import "/src/css/Mindly.css"
import "/src/css/Header.css"

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="text-section">
        <h1 className="fw-bold text-center">LA TUA MENTE MERITA CURA.</h1>
        <h2 className="text-center">CON MINDLY, NON SEI SOLƏ.</h2>
        <p className="text-center" style={{ width: "80%" }}>
          Scopri un percorso di supporto psicologico costruito attorno a te.
          Scegli il professionista più adatto alle tue esigenze, affronta ciò
          che ti blocca e ritrova il tuo equilibrio. La salute mentale è
          importante. Inizia da te.
        </p>
        <button className="button-green mt-3">PRENDI IL PRIMO PASSO</button>
      </div>
      <div className="image-section">
        <img src="/img/foto1.jpg" alt="Foto ispirazionale" />
      </div>
    </div>
  )
}

export default Header
