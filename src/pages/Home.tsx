import Footer from "../component/Footer"
import BlogCards from "../component/home/BlogCards"
import CollegamentoQuestionario from "../component/home/CollegamenteQuestionario"
import Header from "../component/home/Header"
import NostriPsicologi from "../component/home/NostriPsicologi"
import Recensioni from "../component/home/Recensioni"
import Steps from "../component/home/Steps"
import NavBarMenu from "../component/NavBarMenu"

const Home = () => {
  return (
    <>
      <NavBarMenu />
      <Header />
      <div id="steps">
        <Steps />
      </div>
      <CollegamentoQuestionario />
      <NostriPsicologi />
      <div id="recensioni">
        <Recensioni />
      </div>
      <BlogCards />
      <Footer />
    </>
  )
}

export default Home
