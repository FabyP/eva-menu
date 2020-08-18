import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

import sliderImage from './SliderImage.png'


function ControlledCarousel() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel>
      <Carousel.Item>
          <img src={sliderImage} alt="platzhalter"/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={sliderImage} alt="platzhalter"/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={sliderImage} alt="platzhalter"/>
      </Carousel.Item>

    </Carousel>
  );
}

export default ControlledCarousel;