import { useState } from 'react';
import fightClubTrailer from '../assets/fightClubTrailer.webp'
import './MoveDetailsPage.css'
import { Button, Card, Carousel,} from "react-bootstrap"
import  FightClubPoster from '../assets/FightClubPoster.jpg'


//import 'bootstrap/dist/css/bootstrap.min.css';

function MoveDetailsPage() {


  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); 
  const toggleDescriptionText = () => {
  setIsDescriptionExpanded(!isDescriptionExpanded); 
  };

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); 
  const toggleDetailsText = () => {
  setIsDetailsExpanded(!isDetailsExpanded); 
  };
  
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);


  const shortText = "Brad Pitt och Edward Norton gör två knockoutbra roller i denna häpnadsväckande och originella thriller...";
  const fullText = "Brad Pitt och Edward Norton gör två knockoutbra roller i denna häpnadsväckande och originella thriller med ironisk underton av David Fincher, regissören till Seven. Norton spelar Jack, en kroniskt sömnlös man som desperat försöker fly sitt olidligt tråkiga liv. Men så möter han Tyler Durden (Pitt) en karismatisk tvålförsäljare med en snedvriden filosofi. Tyler menar att självförbättring är för de svaga - det är självdestruktion som verkligen gör livet värt att leva. Inom kort är Jack och Tyler i full gång med att mörbulta varandra på en parkeringsplats. Ett renande slagsmål med en endorfinkick utan dess like. För att introducera andra män i denna enkla lycka av fysiskt våld bildar Jack och Tyler en hemlig 'Fight Club' som snabbt blir omåttligt populär. Men en hemsk överraskning väntar Jack, en sanning som kommer att förändra allt";

  const reviews = [
    {
      source: "Sydsvenskan",
      quote: "ett drama berättat med stor ömhet",
      stars: 4,
    },
    {
      source: "Svenska Dagbladet",
      quote: "en film att förälska sig i",
      stars: 5,
    },
    {
      source: "DN",
      quote: "en het romans i åttiotalskostym",
      stars: 3,
    }
  ];
  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  return (
    <>
      <h1>Filmvisarna</h1>
      <Card>
        <Card.Img src={fightClubTrailer} alt='Fight Club Trailer' className="trailerPost"></Card.Img>
        <Card.Body>
          <Card.Title>
            <h3>Fight Club</h3>
          </Card.Title>
          <Button>Boka platser</Button>
          <Card.Title>OM Filmen</Card.Title>
          <Card.Text className='see-more-container'>
            {isDescriptionExpanded ? fullText : shortText}
            <Button variant="link" onClick={toggleDescriptionText} className="see-more-btn">
            {isDescriptionExpanded ? 'See mindre' : 'See mer'}
          </Button>
        </Card.Text>
        </Card.Body>
        <Carousel className='carouselMoveDetail'>
          <Carousel.Item>
            <img className='d-block w-100'
            src={FightClubPoster}
              alt="FightClubPoster" />
            
            <Carousel.Caption>
              <h3>Fight Club</h3>
              </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item>
            <img className='d-block w-100'
            src={FightClubPoster}
              alt="FightClubPoster" />
          </Carousel.Item>
          
          <Carousel.Item>
            <img className='d-block w-100'
            src={FightClubPoster}
              alt="FightClubPoster" />
          </Carousel.Item>
        </Carousel>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Film Detaljer</Card.Title>
          <Card.Text>
            <strong>Regissör:</strong> David Fincher
            <br />
            <strong>Åldersgräns:</strong> 12 år
            <br />
            <strong>Språk:</strong> Engelska
            <br />
            <strong>Textning:</strong> Svenska
            <br />
            <strong>Genre:</strong> Drama
            <br />
            {isDetailsExpanded && (
              <>
                <strong>Utgivningsår:</strong> 1999
                <br />
                <strong>Längd:</strong> 139 minuter
                <br />
                <strong>Skådespelare:</strong> Brad Pitt, Edward Norton
              </>
            )}
          </Card.Text>
          <Card.Text className="see-more-container">
            <Button variant="link" onClick={toggleDetailsText} className="see-more-btn">
              {isDetailsExpanded ? 'See mindre' : 'See mer'}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Recensioner</Card.Title>
          <Card.Text>
            <strong>{reviews[currentReviewIndex].source}</strong>
            <br />
            "{reviews[currentReviewIndex].quote}"
            <br />
            {Array.from({ length: reviews[currentReviewIndex].stars }, (_, i) => (
              <span key={i}>&#9733;</span>
            ))}
            {Array.from({ length: 5 - reviews[currentReviewIndex].stars }, (_, i) => (
              <span key={i}>&#9734;</span>
            ))}
          </Card.Text>
          <Button variant="link" onClick={nextReview} className="see-more-btn">
            Byt Recension
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default MoveDetailsPage