import { useState, useEffect } from 'react';
//import fightClubTrailer from '../assets/fightClubTrailer.webp'
import './MovieDetailsPage.css'
import { Button, Card, Carousel, Dropdown, DropdownButton, Container, Row, Col, CarouselItem,} from "react-bootstrap"
//import  FightClubPoster from '../assets/FightClubPoster.jpg'
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';


//import 'bootstrap/dist/css/bootstrap.min.css';



interface MovieDetails {
  credits: {
    cast: string[];
    directedBy: string[];
  };
  duration: number;
  mediaURLs: {
    trailerURL: string;
    posterURL: string[];
    slideURL: string;
  };
  subtitles: string;
  description: string;
  releaseYear: number;
  spokenLanguage: string;
}

interface Review {
  rating: number;
  review: string;
  reviewBy: string;
}

interface Movie {
  id: number;
  title: string;
  ageRating: string;
  categories: string;
  reviews: Review[];
  details: MovieDetails;
}

interface ApiResponse {
  success: boolean;
  movie: Movie[];
  screenings: { dateTime: string; id: number; movieId: number; theatreId: number }[];
}


function MovieDetailsPage() {
  const navigate = useNavigate();


  const [movie, setMovieData] = useState<ApiResponse | null>(null);

  //Get data from database
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch('/api/moviesDetails/2');
        
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av filmdata.');
        }
        
        const data = await response.json(); // JSON

        data.movie[0].reviews = JSON.parse(`[${data.movie[0].reviews}]`);

        setMovieData(data);
        console.log(data);
      } catch (error) {
        console.error('Fel vid hämtning av filmdata:', error);
      }
    };

    fetchMovieDetails();
  }, []);
  //-------------------------------------------------------

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); 
  const toggleDescriptionText = () => {
  setIsDescriptionExpanded(!isDescriptionExpanded); 
  };

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); 
  const toggleDetailsText = () => {
  setIsDetailsExpanded(!isDetailsExpanded); 
  };
  

  const [selectedTime, setSelectedTime,] = useState<string | null>("välj visning");
  const [selectedTheatreId, setSelectedTheatreId] = useState<string | null>(null);

  const handleSelectTime = (eventKey: string | null) => {
    if (eventKey) {
      // Dela upp eventKey för att få screening.id och tiden
      const [screeningId,theatreId, time] = eventKey.split('|');
      setSelectedTime(time);
      setSelectedTheatreId(theatreId);

      // Logga screening.id
      console.log('Selected screening ID:', screeningId);
      console.log('Selected theatre ID:', theatreId);
      console.log(time);
    }
  };  


  //
  if (!movie) { 
    return <div>Laddar...</div>;
  }
  const fullText = movie.movie[0].details.description;
  const shortText = fullText.length > 100 ? fullText.substring(0, 100) + '...' : fullText;

    const groupedScreenings = movie.screenings.reduce((acc: any, screening) => {
    const date = format(new Date(screening.dateTime), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(screening);
    return acc;
  }, {});

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
{/*src={`/images/${movie.movie[0].details.mediaURLs.posterURL[3]}?url`} */}
        <Container>
          <Row className="d-flex flex-column flex-md-row mt-5">
            <Col xs={{ span: 12 }} lg={{ span: 6, order: 'last' }}>
              <Carousel className='carouselMovieDetail' interval={null} indicators={false}>
                {movie.movie[0].details.mediaURLs.posterURL.map((poster, index) => (
                  <Carousel.Item key={index}>
                    <img 
                      className='d-block w-100 poster-image'
                      src={poster}
                      alt={`Poster ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
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
                <Carousel interval={null}>
                  {movie.movie[0].reviews.map((review, index) => (
                    <Carousel.Item key={index}>
                      <Card.Body>
                        <Card.Title>Recensioner</Card.Title>
                        <Card.Text className="mb-0 see-more-container">
                          <strong>{review.reviewBy}</strong>
                          <br />
                          "{review.review}"
                          <br />
                          {Array.from({ length: review.rating }, (_, i) => (
                            <span key={i}>&#9733;</span>
                          ))}
                          {Array.from({ length: 5 - review.rating }, (_, i) => (
                            <span key={i}>&#9734;</span>
                          ))}
                        </Card.Text>
                      </Card.Body>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Row className="d-flex justify-content-center">
            <Col xs="auto">
              <DropdownButton
                id="dateTime-Dropdown"
                title={selectedTime || "välj visning"}
                className="custom-dropdown-button text-secondary mx-auto"
                variant="outline-secondary"
                onSelect={handleSelectTime}
                flip={false}
                rootCloseEvent="click"
              >
                <Dropdown.Item eventKey="välj visning" as="button">välj visning</Dropdown.Item>
                {Object.entries(groupedScreenings).flatMap(([, screenings]: [string, any]) =>
                  screenings.map((screening: any) => (
                    <Dropdown.Item 
                      key={screening.id} 
                      eventKey={`${screening.id}|${screening.theatreId}|${format(new Date(screening.dateTime), 'MM-dd HH:mm')}`} 
                      as="button"
                    >
                      {`${format(new Date(screening.dateTime), 'M/d HH:mm')}`}
                    </Dropdown.Item>
                  ))
                )}
              </DropdownButton>
            </Col>
          </Row>
        </Container>
{/* // JOBBA HÄR----------------------------------------------------- */}
        <Row className="d-flex justify-content-center mt-3 mb-3">
          <Col xs="auto">
            <Col className='seats-left mt-2' >Salong {selectedTheatreId || "(välj visning)"}</Col> 
            <Button onClick={() => navigate("/boka")} className=' mt-3'>Boka platser</Button>
          </Col>
        </Row>

        {/* karusell ------------------------------------------------------------------- */}

        <Container className="calendar-container mt-5">
          <Carousel interval={null} indicators={false} controls={true} className="calendar-carousel">
            {Object.entries(groupedScreenings).map(([date, screenings]: [string, any]) => (
              <CarouselItem key={date} className="calendar-item">
                <Card className="calendar-card">
                  <Card.Header>
                    <h4>{format(new Date(date), 'EEEE dd/MM', { locale: sv })}</h4>
                  </Card.Header>
                  <Card.Body>
                    {screenings.map((screening: any) => (
                      <Card
                        key={screening.id}
                        onClick={() => navigate("/boka")}
                        className="mb-3 square-card"
                      >
                        <Card.Body className="bg-primary">
                          <Card.Title>{format(new Date(screening.dateTime), 'HH:mm')}</Card.Title>
                          <Card.Text>Salong {screening.theatreId}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>
              </CarouselItem>
            ))}
          </Carousel>
        </Container>


{/* karusell ------------------------------------------------------------------- */}
      
      </Container>
    </>
  )
}

export default MovieDetailsPage