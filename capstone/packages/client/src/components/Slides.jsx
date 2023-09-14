import { Carousel} from "react-bootstrap";
import React from 'react'

function Slides() {
  return (
    <Carousel>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="dish5.jpeg"
        alt="Image One"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block"
src="image11.jpeg"
        alt="Image Two"
      />

    </Carousel.Item>
  </Carousel>
  )
}

export default Slides