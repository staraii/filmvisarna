import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormInputs from "./FormInputs/FormInputs";
import ImageForm from "./ImageForm/ImageForm";
import NewReview from "./NewReview/NewReview";
import ShowReviews from "./ShowReviews/ShowReviews";
import { Review, Movie, ImagesStateDefault, FilesDefault } from "../../AdminTypes";


const movieDefaults: Movie = {
  id: null,
  title: "",
  ageRating: "",
  createdAt: "",
  cast: "",
  directedBy: "",
  duration: "",
  slideFile: null,
  slidePreview: "",
  slideURL: "",
  posterFile: null,
  posterPreview: "",
  posterURL: "",
  postersFiles: null,
  postersPreviews: "",
  postersURLS: "",
  trailerURL: "",
  subtitles: "",
  spokenLanguage: "",
  description: "",
  releaseYear: "",
};


const imagesStateDefault: ImagesStateDefault = {
  slide: {
    preview: "",
    url: "",
  },
  poster: {
    preview: "",
    url: "",
  },
  postersList: {
    previews: [],
    urls: [],
  },
};


const filesDefault: FilesDefault = {
  poster: null,
  slide: null,
  postersList: [],
}

export default function MovieForm() {
  const [movie, setMovie] = useState<Movie>(movieDefaults);
  const [categories, setCategories] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState(imagesStateDefault);
  const [files, setFiles] = useState<FilesDefault>(filesDefault);
  const addReview = (newReview: Review) => {
    const reviewsList = [...reviews];
    reviewsList.push(newReview);
    setReviews(reviewsList);
  }
  const removeReview = (revIndex: number) => {
    setReviews((prevRevs) => ([...prevRevs.filter((_, i) => i !== revIndex)]))
  }

  const onChangeHandler = (name: string, value: string) => {
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    if (files && (name === "poster" || name === "slide")) {
      setImages((prevImg) => ({...prevImg, [name]: {...prevImg[name],
            preview: URL.createObjectURL(files[0]),
          },
            }));
      setFiles((prevFiles) => ({...prevFiles, [name]: files[0]}))
    }
  }
  const handlePostersList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files) {
      const previews: string[] = [];
      for (const file of files) {
        previews.push(URL.createObjectURL(file))
      }

      setImages((prevImg) => ({ ...prevImg, postersList: { ...prevImg.postersList, previews: [...previews]}}))
      setFiles((prevFiles) => ({...prevFiles, postersList: [...prevFiles.postersList, ...files]}))
    }
  }
  const handleRemovePoster = () => {
    setImages((prevImg) => ({ ...prevImg, poster: { preview: "", url: "" } }))
    setFiles((prevFiles) => ({...prevFiles, poster: null}))
  }
  const handleRemoveSlide = () => {
    setImages((prevImg) => ({
      ...prevImg,
      slide: { preview: "", url: "" },
    }));
    setFiles((prevFiles) => ({...prevFiles, slide: null}))
  };
  const handleRemoveFromPostersList = (index: number) => {
    URL.revokeObjectURL(images.postersList.previews[index]);

    setImages((prevImg) => ({
      ...prevImg, postersList: {
        ...prevImg.postersList, previews: prevImg.postersList.previews.filter((_, i) => i !== index),
      },
    }));
    setFiles((prevFiles) => ({
      ...prevFiles, postersList: [...prevFiles.postersList.filter((_, i) => i !== index)],
    }));
  }


  const toggleCategories = (value: string) => {
    setCategories((prevCat) =>
      prevCat.includes(value)
        ? prevCat.filter((val) => val !== value)
        : [...prevCat, value]
    );
  };

  return (
    <Container className="d-flex flex-column">
      <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} className="pt-0 mt-0">
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
        >
          <FormInputs
            onChangeHandler={onChangeHandler}
            movie={movie}
            categories={categories}
            toggleCategories={toggleCategories}
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <ImageForm
            images={images}
            handleImageChange={handleImageChange}
            handlePostersList={handlePostersList}
            handleRemovePoster={handleRemovePoster}
            handleRemoveFromPostersList={handleRemoveFromPostersList}
            handleRemoveSlide={handleRemoveSlide}
            movie={{title: movie.title, slidePreview: movie.slidePreview, posterPreview: movie.posterPreview, subtitles: movie.subtitles, spokenLanguage: movie.spokenLanguage, ageRating: movie.ageRating}}
            files={files}
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {reviews && reviews.length > 0 && (
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {reviews.map((rev, index) => (
                  <ShowReviews
                    key={index}
                    index={index}
                    reviewBy={rev.reviewBy}
                    review={rev.review}
                    rating={rev.rating}
                    removeReview={() => removeReview(index)}
                  />
                ))}
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              {/* Reviews */}
              <NewReview addReview={addReview} />
            </Col>
          </Row>
        </Col>


        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="px-4 mt-4">
          <Row>
            <Col xs={6} sm={6}>
              <Button variant="outline-secondary w-100">Rensa formulär</Button>
            </Col>
            <Col xs={6} sm={6}>
              <Button variant="outline-secondary w-100">Spara film</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="px-4 mt-4">
          <p>
            <a
              href="http://https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_spr%C3%A5kkoder_i_ISO_639"
              target="_blank"
              rel="noreferrer"
            >
              Lista över språkkoder
            </a>{" "}
            att använda till talat språk och undertexter.
          </p>
          <p>
            <a
              href="https://https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              Filmdatabas med bra bilder, 
            </a>
            {" "}affischer/posters till posters och bakgrunder till slides
          </p>
          <p>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>{" "}
            för filmtrailers
          </p>
        </Col>
      </Row>
    </Container>
  );
}