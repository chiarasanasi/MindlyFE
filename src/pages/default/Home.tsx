import Footer from "../../component/Footer"
import BlogCards from "../../component/home/BlogCards"
import CollegamentoQuestionario from "../../component/home/CollegamenteQuestionario"
import Header from "../../component/home/Header"
import NostriPsicologi from "../../component/home/NostriPsicologi"
import Recensioni from "../../component/home/Recensioni"
import Steps from "../../component/home/Steps"
import NavBarMenu from "../../component/NavBarMenu"

import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <>
      <NavBarMenu />
      <div id="header">
        <Header />
      </div>

      <div id="steps">
        <Steps />
      </div>
      <CollegamentoQuestionario />
      <div id="i-nostri-psicologi">
        <NostriPsicologi />
      </div>

      <div id="recensioni">
        <Recensioni />
      </div>
      <div id="midly-blog">
        <BlogCards />
      </div>

      <Footer />
    </>
  )
}

export default Home
