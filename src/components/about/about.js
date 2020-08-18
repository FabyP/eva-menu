import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import sliderImage from './SliderImage.png'

import './about.css';

function ControlledCarousel() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='container-fluid' >  

      <h1 className="topic">Allgemeine Informationen</h1>

      <Carousel interval={10000} keyboard={false} pauseOnHover={true} className="carousel">  
        <Carousel.Item style={{'height':"600px"}}  >  
          <img style={{'height':"600px"}}   className="d-block w-100" src={sliderImage}  />  
          <Carousel.Caption className="caption">  
            <h3>Wie bestelle ich? </h3>  
            <p>Gehe auf die Speisekarte und wähle eine Speise deiner Wahl. Durch das plus fügst du die Speise in deine Bestellun hinzu. 
              Hast du alle die Speisen deiner Wahl deiner Bestellung hinzugefügt, so kannst du oben rechts auf den Korb klicken. 
              Solltest du etwas an deinem Gericht verändern oder eine Nachricht anfügen wollen, so klicke auf den Stift bei dem enstprechenden Gericht.
              Mit dem Button Bestellung gibst du diese auf und den Rest überlässt du uns. Lass es dir schmecken</p>
          </Carousel.Caption>  
        </Carousel.Item  >  
        <Carousel.Item style={{'height':"600px"}}>  
          <img style={{'height':"600px"}} className="d-block w-100" src={sliderImage}  />  
          <Carousel.Caption className="caption">  
            <h3>Wofür stehen wir?</h3> 
            <p>Wir bieten ihnen regionales sowie saisonales Essen. Unsere Lebensmittel werden von Bauern im Umkreis zur Verfügung gestellt.</p> 
            <p>Des Weiteren stehen wir für Transparenz. Inhaltsstoffe finden sie deswegen unter jedem Gericht in unsere Speisekarte, auch online. 
              Sollten sie Fragen haben sprechen sie gerne unser Personal an.</p> 
          </Carousel.Caption>  
        </Carousel.Item>  
        <Carousel.Item style={{'height':"600px"}}>  
          <img style={{'height':"600px"}}  className="d-block w-100" src={sliderImage}  />  
          <Carousel.Caption className="caption">  
            <h3>Unsere Öffnungszeiten</h3>  
            <p>Montag: Ruhetag</p>
            <p>Dienstag: 17:00-20:00</p>
            <p>Mittwoch: 17:00-20:00</p>
            <p>Donnerstag: 17:00-20:00</p>
            <p>Freitag: 17:00-20:00</p>
            <p>Samstag: 8:00-20:00</p>
            <p>Sonntag: 8:00-20:00</p>
          </Carousel.Caption>  
        </Carousel.Item>  
      </Carousel>  
    </div>  
  );
}

export default ControlledCarousel;