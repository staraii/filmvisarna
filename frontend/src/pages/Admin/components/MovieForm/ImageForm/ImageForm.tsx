import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageUpload from "../ImageUpload/ImageUpload";
import ScreeningCard from "../../../../HomePage/ScreeningCard/ScreeningCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ImagesStateDefault } from "../../../AdminTypes";



interface MovieDetails {
  title: string;
  slidePreview: string;
  posterPreview: string;
  subtitles: string;
  spokenLanguage: string;
  ageRating: string;
  [key: string]: string;
}

interface FilesProp {
  slide: File | null;
  poster: File | null;
  postersList: File[];
}
interface ImageFormProps {
  images: ImagesStateDefault;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostersList: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemovePoster: () => void;
  handleRemoveFromPostersList: (index: number) => void;
  handleRemoveSlide: () => void;
  movie: MovieDetails;
  files: FilesProp; 
}
export default function ImageForm({ images, handleImageChange, handlePostersList, handleRemovePoster, handleRemoveFromPostersList, handleRemoveSlide, movie, files }: ImageFormProps) {
  const [showScreeeningPreview, setShowScreeningPreview] = useState(false);
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex flex-column gap-5">
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-0"
              >
                <ImageUpload
                  handleImageChange={handleImageChange}
                  preview={images.poster.preview}
                  file={files.poster}
                  name="poster"
                  controlId="poster"
                  label="Filmposter"
                  handleRemoveImage={handleRemovePoster}
                  handleRemoveFromList={handleRemoveFromPostersList}
                  desc="Ladda upp en filmposter. Detta kommer vara den poster som syns på
              förstasidan så tänk på att välja en poster som tydligt visar
              filmens titel. Giltiga filformat är .jpg, .png och .webp."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <ImageUpload
                  handleImageChange={handleImageChange}
                  preview={images.slide.preview}
                  file={files.slide}
                  name="slide"
                  controlId="slide"
                  label="Film slide/bakgrund"
                  handleRemoveImage={handleRemoveSlide}
                  handleRemoveFromList={handleRemoveFromPostersList}
                  desc="Ladda upp en slide/bakgrund. Detta är bilderna som syns i bildspelet på första sidan och som blir bakgrund på visningskorten på förstasidan. Giltiga filformat är .jpg, .png och .webp."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <ImageUpload
                  handleImageChange={handlePostersList}
                  previewList={images.postersList.previews}
                  fileList={files.postersList}
                  name="postersList"
                  controlId="postersList"
                  label="Flera filmposters"
                  handleRemoveImage={handleRemovePoster}
                  handleRemoveFromList={handleRemoveFromPostersList}
                  desc="Ladda upp fler filmposters. Dessa kommer visas i bildspelet på filmsidan för denna film. Giltiga filformat är .jpg, .png och .webp."
                />
              </Col>
            </Row>

            {images.poster.preview && images.slide.preview && (
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() =>
                      setShowScreeningPreview(!showScreeeningPreview)
                    }
                    className="w-100"
                  >
                    Visa förhandsgranskning av visningskort
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Modal
        show={showScreeeningPreview}
        onHide={() => setShowScreeningPreview(false)}
        centered
      >
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <ScreeningCard
                  screeningId={1}
                  movieId={1}
                  occupiedPercent={0}
                  ageRating={movie.ageRating}
                  slideURL={""}
                  posterURL={""}
                  subtitles={`${movie.subtitles}.text`}
                  spokenLanguage={`${movie.spokenLanguage}.tal`}
                  dateTime={new Date().toString()}
                  movieTitle={movie.title}
                  slidePreview={
                    images.slide.preview ? images.slide.preview : undefined
                  }
                  posterPreview={
                    images.poster.preview ? images.poster.preview : undefined
                  }
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => setShowScreeningPreview(false)}
            className="w-100 mt-3"
          >
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}