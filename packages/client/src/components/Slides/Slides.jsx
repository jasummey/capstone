import { Carousel} from "react-bootstrap";
import React from 'react'
import './Slides.css'

function Slides() {
  return (
    <Carousel>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src= "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg"
        alt="Image One"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg"
        alt="Image Two"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
        alt="Image Three"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg"
        alt="Image Four"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg"
        alt="Image Five"
      />
    </Carousel.Item>
  </Carousel>
  )
}

export default Slides