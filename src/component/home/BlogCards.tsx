import { Container, Row, Col, Card } from "react-bootstrap"
import "/src/css/Mindly.css"
import "/src/css/BlogCard.css"
import { Link } from "react-router-dom"
const articoli = [
  {
    title: "Tipi di psicoterapia: quali sono?",
    image: "/img/blog1.jpg",
    link: "/blog/tipi-di-psicoterapia",
  },
  {
    title: "Differenza tra psicologo, psicoterapeuta e psichiatra",
    image: "/img/blog2.jpg",
    link: "/blog/differenza-professionisti",
  },
  {
    title: "Psicologo online: prezzi e tariffe",
    image: "/img/blog3.jpg",
    link: "/blog/psicologo-online-prezzi",
  },
  {
    title: "Il Disturbo Borderline di Personalità (DBP): sintomi e cura",
    image: "/img/blog4.jpg",
    link: "/blog/disturbo-borderline",
  },
  {
    title: "Binge Eating Disorder: il disturbo da alimentazione incontrollata",
    image: "/img/blog5.jpg",
    link: "/blog/binge-eating-disorder",
  },
  {
    title: "Attacchi d’ansia: come riconoscerli e gestirli",
    image: "/img/blog6.jpg",
    link: "/blog/attacchi-ansia",
  },
  {
    title: "Come scegliere lo psicologo giusto per te",
    image: "/img/blog7.jpg",
    link: "/blog/come-scegliere-psicologo",
  },
  {
    title: "Quando iniziare un percorso di psicoterapia",
    image: "/img/blog8.jpg",
    link: "/blog/quando-iniziare-psicoterapia",
  },
]

const BlogCard = () => {
  return (
    <section className="blog-section py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="blog-title">MINDLYBLOG</h2>
        </div>
        <Row className="g-4">
          {articoli.map((article, i) => (
            <Col xs={12} sm={6} md={4} lg={3} key={i}>
              <Card className="blog-card h-100">
                <Card.Img
                  variant="top"
                  src={article.image}
                  alt={article.title}
                />
                <Card.Body>
                  <Card.Title className="blog-card-title">
                    {article.title}
                  </Card.Title>
                  <Link to={article.link} className="blog-card-link">
                    <button className="read-button">Leggi l'articolo</button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default BlogCard
