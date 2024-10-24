import { useState, useEffect } from 'react';
//import fightClubTrailer from '../assets/fightClubTrailer.webp'
import './MovieDetailsPage.css'
import { Button, Card, Carousel, Dropdown, DropdownButton, Container, Row, Col, CarouselItem,} from "react-bootstrap"
import  FightClubPoster from '../assets/FightClubPoster.jpg'
import { useNavigate } from "react-router-dom";


//import 'bootstrap/dist/css/bootstrap.min.css';

interface MovieDetails {
  credits: {
    cast: string[];
    directedBy: string[];
  };
  duration: number;
  mediaURLs: {
    trailerURL: string;
    posterURL: string;
    slideURL: string;
  };
  subtitles: string;
  description: string;
  releaseYear: number;
  spokenLanguage: string;
}

interface Movie {
  id: number;
  title: string;
  ageRating: string;
  categories: string;
  reviews: string;
  details: MovieDetails;
}

interface ApiResponse {
  success: boolean;
  movie: Movie[];
  screenings: object[];
}


function MovieDetailsPage() {
  const navigate = useNavigate();


  const [movie, setMovieData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch('/api/moviesDetails/1');
        
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av filmdata.');
        }
        
        const data = await response.json(); // JSON
        setMovieData(data);
        console.log(data);
      } catch (error) {
        console.error('Fel vid hämtning av filmdata:', error);
      }
    };

    fetchMovieDetails();
  }, []);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); 
  const toggleDescriptionText = () => {
  setIsDescriptionExpanded(!isDescriptionExpanded); 
  };

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); 
  const toggleDetailsText = () => {
  setIsDetailsExpanded(!isDetailsExpanded); 
  };
  
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState<string | null>("Datum");  
  const handleSelectDate = (eventKey: string | null) => {
    setSelectedDate(eventKey);
  };

  const [selectedTime, setSelectedTime] = useState<string | null>("Tid");

  const handleSelectTime = (eventKey: string | null) => {
  setSelectedTime(eventKey);
  };  

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

  //
  if (!movie) { 
    return <div>Laddar...</div>;
  }
  const fullText = movie.movie[0].details.description;
  const shortText = fullText.length > 100 ? fullText.substring(0, 100) + '...' : fullText;

  return (
    <>
      <Container>
        <Container className="d-flex flex-column align-items-center">
          <Row className="d-flex flex-column flex-md-row ">
            <Col xs={12} md={12} lg={6} xl={6} xxl={6} className='movie-trailer-container'>
              <div className="movie-trailer-container embed-responsive embed-responsive-16by9">
                <iframe
                  className="movie-trailer-size embed-responsive-item"
                  src={`https://www.youtube.com/embed/${movie.movie[0].details.mediaURLs.trailerURL}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                  width="100%"
                />
              </div>
            </Col>
            <Col className="mt-3">
              <Card.Body className="">
                <Container>
                  <Card.Title>
                    <h3>{movie.movie[0].title}</h3>
                  </Card.Title>
                  <Button onClick={() => navigate("/boka")} >Boka platser</Button>
                  <Card.Title className="mt-4" >OM Filmen</Card.Title>
                  <Card.Text className='see-more-container'>
                    {isDescriptionExpanded ? fullText : shortText}
                    <Button variant="link" onClick={toggleDescriptionText} className="see-more-btn">
                    {isDescriptionExpanded ? 'See mindre' : 'See mer'}
                    </Button>
                  </Card.Text>
                </Container>
              </Card.Body>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="d-flex flex-column flex-md-row mt-5">
            <Col xs={{span:12}} lg={{span:6, order: 'last'}}>
              <Carousel className='carouselMovieDetail'>
                <Carousel.Item>
                  <img className='d-block w-100'
                    src={FightClubPoster}
                    alt="FightClubPoster"/>
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
            </Col>
            <Col className='d-flex flex-column film-details-rec'>
              <Card>
                <Card.Body>
                  <Card.Title>Film Detaljer</Card.Title>
                  <Card.Text className="mb-0 see-more-container" >
                    <strong>Regissör:</strong> {movie.movie[0].details.credits.directedBy.join(', ')}
                    <br />
                    <strong>Åldersgräns:</strong> {movie.movie[0].ageRating}
                    <br />
                    <strong>Språk:</strong> {movie.movie[0].details.spokenLanguage}
                    <br />
                    <strong>Textning:</strong> {movie.movie[0].details.subtitles}
                    <br />
                    <strong>Genre:</strong> {movie.movie[0].categories}
                    <br />
                    {isDetailsExpanded && (
                      <>
                        <strong>Utgivningsår:</strong> {movie.movie[0].details.releaseYear}
                        <br />
                        <strong>Längd:</strong> {movie.movie[0].details.duration} minuter
                        <br />
                        <strong>Skådespelare:</strong> {movie.movie[0].details.credits.cast.join(', ')}
                      </>
                    )}
                  </Card.Text>
                  <Card.Text className=" see-more-container">
                    <Button variant="link" onClick={toggleDetailsText} className="mt-1 see-more-btn">
                      {isDetailsExpanded ? 'See mindre' : 'See mer'}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Recensioner</Card.Title>
                  <Card.Text className="mb-0 see-more-container">
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
                  <Button variant="link" onClick={nextReview} className="mb-5 see-more-btn">
                    Byt Recension
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

          <Container className="mt-5">
              <Row className="d-flex justify-content-center">
                <Col xs="auto">
                  <DropdownButton
                    id="Datum"
                    title={selectedDate || "Datum"}
                    className="text-secondary mx-auto"
                    variant="outline-secondary"
                    onSelect={handleSelectDate}>
                    <Dropdown.Item eventKey="Datum" as="button">Datum</Dropdown.Item>
                    <Dropdown.Item eventKey="Fredag 20/9" as="button">Fredag 20/9</Dropdown.Item>
                    <Dropdown.Item eventKey="Lördag 21/9" as="button">Lördag 21/9</Dropdown.Item>
                    <Dropdown.Item eventKey="Söndag 21/9" as="button">Söndag 22/9</Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col xs="auto" >
                  <DropdownButton
                    id="time-DropDown"
                    title={selectedTime || "Tid"}
                    className="text-secondary mx-auto"
                variant="outline-secondary"
                    onSelect={handleSelectTime}>
                    <Dropdown.Item eventKey="Tid" as="button">Tid</Dropdown.Item>
                    <Dropdown.Item eventKey="10:00" as="button">10:00</Dropdown.Item>
                    <Dropdown.Item eventKey="16:00" as="button">16:00</Dropdown.Item>
                    <Dropdown.Item eventKey="22:00" as="button">22:00</Dropdown.Item>
                  </DropdownButton>
            </Col>
          </Row>
        </Container>

        <Row className="d-flex justify-content-center mt-3 mb-3">
          <Col xs="auto">
            <Col className='seats-left' >33 Platser kvar</Col>
            <Col className='seats-left mt-2' >Salong 1</Col>
            <Button onClick={() => navigate("/boka")} className=' mt-3'>Boka platser</Button>
          </Col>
        </Row>

        {/* karusell ------------------------------------------------------------------- */}

        <Container className="calendar-container mt-5">
          <Carousel interval={null} indicators={false} controls={true} className="calendar-carousel">
            <CarouselItem className="calendar-item calendar-item1">
              <Card  className="calendar-card">
                <Card.Header>
                  <h4>Måndag 24/9</h4>
                </Card.Header>
                <Card.Body>

                  <Card onClick={() => navigate("/boka")} className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card onClick={() => navigate("/boka")} className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card  onClick={() => navigate("/boka")} className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item2">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>tisdag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item3">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>onsdag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item4">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>torsdag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item5">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>fredag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item6">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>lördag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

            <CarouselItem className="calendar-item calendar-item7">
              <Card className="calendar-card">
                <Card.Header>
                  <h4>Söndag 24/9</h4>
                </Card.Header>
                <Card.Body>
                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3 square-card">
                    <Card.Body className="bg-primary">
                      <Card.Title>22:00</Card.Title>
                      <Card.Text>Salong 2</Card.Text>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </CarouselItem>

          </Carousel>
        </Container>
      
      </Container>
    </>
  )
}

export default MovieDetailsPage