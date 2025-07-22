import { useParams } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import NavBarMenu from "../../component/NavBarMenu"
import Footer from "../../component/Footer"
import "/src/css/Mindly.css"
import "/src/css/BlogDettaglio.css"

const articoli = {
  "tipi-di-psicoterapia": {
    title: "Tipi di psicoterapia: quali sono?",
    image: "/img/blog1.jpg",
  },
  "differenza-professionisti": {
    title: "Differenza tra psicologo, psicoterapeuta e psichiatra",
    image: "/img/blog2.jpg",
  },
  "psicologo-online-prezzi": {
    title: "Psicologo online: prezzi e tariffe",
    image: "/img/blog3.jpg",
  },
  "disturbo-borderline": {
    title: "Il Disturbo Borderline di Personalità (DBP): sintomi e cura",
    image: "/img/blog4.jpg",
  },
  "binge-eating-disorder": {
    title: "Binge Eating Disorder: il disturbo da alimentazione incontrollata",
    image: "/img/blog5.jpg",
  },
  "attacchi-ansia": {
    title: "Attacchi d’ansia: come riconoscerli e gestirli",
    image: "/img/blog6.jpg",
  },
  "come-scegliere-psicologo": {
    title: "Come scegliere lo psicologo giusto per te",
    image: "/img/blog7.jpg",
  },
  "quando-iniziare-psicoterapia": {
    title: "Quando iniziare un percorso di psicoterapia",
    image: "/img/blog8.jpg",
  },
}

const BlogDettaglio = () => {
  const { slug } = useParams()
  const articolo = articoli[slug as keyof typeof articoli]

  if (!articolo) {
    return (
      <Container className="mt-5 text-center">
        <h2>Articolo non trovato</h2>
      </Container>
    )
  }

  return (
    <>
      <NavBarMenu />
      <div className="blog-dettaglio-container spazio-dalla-navbar">
        <Row className="d-flex justify-content-center">
          <h1 className="blog-dettaglio-title text-center mb-5">
            {articolo.title}
          </h1>

          <div className="d-flex flex-column flex-lg-row align-items-lg-start align-items-md-center justify-content-center ">
            <Col
              lg={3}
              md={10}
              sm={10}
              className="d-flex justify-content-center"
            >
              <img
                src={articolo.image}
                alt={articolo.title}
                width={"350px"}
                className=" mb-4"
              />
            </Col>
            <Col lg={6} md={10} sm={10}>
              <p className="blog-dettaglio-content ms-lg-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                gravida lacinia turpis, a gravida velit tristique vel. Cras
                facilisis vehicula orci, sit amet blandit erat malesuada eget.
                Quisque porta rutrum erat nec imperdiet. Integer condimentum
                orci vitae risus commodo, non pulvinar justo convallis.
                Suspendisse vel sem eu risus sollicitudin luctus. Nulla
                facilisi. Duis fermentum lorem nec diam accumsan tincidunt.
                Fusce in libero eu est fringilla dapibus a ut purus. Curabitur
                sed felis vitae erat vulputate elementum. Aenean imperdiet
                lacinia nisi a scelerisque. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae. Donec
                congue risus nec gravida laoreet. Phasellus rutrum, sapien eget
                cursus dapibus, enim mi rhoncus nunc, in vehicula libero metus
                in lorem. Proin sed libero tincidunt, facilisis nulla in,
                ultricies mi. Pellentesque ac felis id neque accumsan pretium.
                Nunc efficitur vestibulum metus, vitae porttitor est sodales ac.
              </p>
            </Col>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default BlogDettaglio
