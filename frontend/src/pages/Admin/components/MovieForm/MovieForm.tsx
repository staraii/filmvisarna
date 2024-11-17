import { useState } from "react";
import Form from "react-bootstrap/Form";
import TextInput from "./TextInput/TextInput";
import ToggleCategories from "./ToggleCategories/ToggleCategories";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImageUpload from "./ImageUpload/ImageUpload";
import SelectAgeRating from "./SelectAgeRating/SelectAgeRating";


// interface FullMovie {
//   id: number | null;
//   title: string;
//   ageRating: number;
//   createdAt: string;
//   categories: string;
//   reviews: Review[];
//   details: MovieDetails;
// }

// interface MovieDetails {
//   credits: {
//     cast: string[];
//     directedBy: string[];
//   };
//   duration: number;
//   mediaURLs: {
//     slideURL: string;
//     posterURL: string[];
//     trailerURL: string;
//   };
//   subtitles: string;
//   spokenLanguage: string;
//   description: string;
//   releaseYear: number;
// }

// const movieForm = {
//   id: null,
//   title: null,
//   ageRating: null,
//   createdAt: null,
//   categories: null,
// }

interface Review {
  review: string | null;
  reviewBy: string | null;
  rating: number | null;
}
// const review: Review = {
//   review: null,
//   reviewBy: null,
//   rating: null,
// }


interface MovieProps {
  id: number | null;
  title: string;
  ageRating: string;
  createdAt?: string | null;
}
const moviePropsDefault: MovieProps = {
  id: null,
  title: "",
  ageRating: "",
  createdAt: null,
}
//const categoriesDefault: string[] = [];

// const categoriesList = {
//   "Action": "5",
//   "Animerat": "6",
//   "Äventyr": "7",
//   "Barnfilm": "8",
//   "Drama": "9",
//   "Fantasy": "10",
//   "Komedi": "11",
//   "Romantik": "12",
//   "Sci-fi": "13",
//   "Svensk": "14",
//   "Thriller": "15",
// }


interface MovieDetails {
  cast: string;
  directedBy: string;
  duration: string;
  slideFile: null | File;
  slidePreview: string;
  slideURL: string;
  posterFile: null | File;
  posterPreview: string;
  posterURL: string;
  postersFiles: null | File[];
  postersPreviews: string;
  postersURLS: string;
  trailerURL: string;
  subtitles: string;
  spokenLanguage: string;
  description: string;
  releaseYear: string;
  [key: string]: string | string[] | null | File | File[];
}
const movieDetailsDefault: MovieDetails = {
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
}

interface MovieFormProps {
  existing: boolean;
}

const regExes = {
  id: /^[1-9][0-9]*$/,
  duration: /^[1-9][0-9]*$/,
  title: /^.+$/,
  cast: /^[a-zA-ZåäöÅÄÖ]+$/,
  directedBy: /^[a-zA-ZåäöÅÄÖ]+$/,
  subtitles: /^[a-zA-ZåäöÅÄÖ]{2,3}[.]text$/,
  spokenLanguage: /^[a-zA-ZåäöÅÄÖ]{2,3}[.]tal$/,
  description: /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
  releaseYear: /^19[0-9][0-9]$/,
  ageRating: /^(?:1|7|11|15)$/,
  posterURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  slideURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  trailerURL: new RegExp(
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/,
    "gim"
  ),
};
type MovieDetailsRegExes = { [key: string]: RegExp }
const movieDetailsRegExes: MovieDetailsRegExes = {
  cast: /^[a-zA-ZåäöÅÄÖ]+$/,
  directedBy: /^[a-zA-ZåäöÅÄÖ]+$/,
  duration: /^[1-9][0-9]*$/,
  slideURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  posterURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  trailerURL: new RegExp(
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/,
    "gim"
  ),
  subtitles: /^[a-zA-ZåäöÅÄÖ]{2,3}[.]text$/,
  spokenLanguage: /^[a-zA-ZåäöÅÄÖ]{2,3}[.]tal$/,
  description: /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
  releaseYear: /^19[0-9][0-9]$/,
};

// type FormStates = MovieProps | MovieDetails;
// type RegExes = MovieDetailsRegExes;

type Invalid = Partial<Record<keyof MovieDetails, string>>

// interface DefaultImages {
//   [key: string]: null | string | File;
// }
// const defaultImages = {
//   slideFile: null,
//   slidePreview: null,
//   slideURL: null,
//   mainPosterFile: null,
//   mainPosterPreview: null,
//   mainPosterURL: null,
//   posterFilesList: null,
//   posterPreviewsList: null,
//   posterURLList: null,
// }
// type ImageFile = File | null;
// type ImagePreview = string | null;
// type ImageURL = string | null;
type ImageType = string | File | null;
interface ImagesStateDefault {
  slide: SingleImage;
  poster: SingleImage;
  postersList: ImagesList,
  [key: string]: SingleImage | ImagesList;
}
type ImagePreview = string | null;
type ImageFile = File | null;
type ImageURL = string | null;
type SingleImageType = { [key: string]: ImagePreview | ImageFile | ImageURL };
type ImagesListType = {[key: string]: ImagePreview[] | ImageFile[] | ImageURL[]}
//type ImagesType = ImagePreview | ImageFile | ImageURL;
type DefImages = { [key: string]: SingleImageType | ImagesListType };
//type ImagesListType = ImagePreview[] | ImageFile[] | ImageURL[];

interface SingleImage {
  file: File | null;
  preview: string | null;
  url: string | null;
  [key: string]: string | null | File;
}
interface ImagesList {
  files: File[] | [];
  previews: string[] | [];
  urls: string[] | [];
  [key: string]: string[] | File[] | [];
}


type ImageStateProp = { [key: string]: (string | File | null) | (string[] | File[] | null) }
interface DefaultImageState {
  [key: string]: ImageStateProp;
}
const imagesStateDefault: ImagesStateDefault = {
  slide: {
    file: null,
    preview: null,
    url: null,
  },
  poster: {
    file: null,
    preview: null,
    url: null,
  },
  postersList: {
    files: [],
    previews: [],
    urls: [],
  },
};


export default function MovieForm({existing}: MovieFormProps) {
  const [movieProps, setMovieProps] = useState<MovieProps>(moviePropsDefault);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>(movieDetailsDefault);
  const [categories, setCategories] = useState<string[]>([]);
  //const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState(imagesStateDefault)
  const [invalid, setInvalid] = useState<Invalid>({});

  // const validate = (state: MovieDetails, regExes: RegExes) => {
  //   for (const prop in state) {
  //     if(regExes[prop].test(state[prop]))
  //   }
  // }
  const formName = "EditForm";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieProps((prevProps) => ({ ...prevProps, title: e.target.value }));
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieDetails((prevDet) => ({ ...prevDet, [name]: value }));
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    if (files && (name === "poster" || name === "slide")) {
        setImages((prevImg) => ({...prevImg, [name]: {...prevImg[name], file: files[0], preview: URL.createObjectURL(files[0])}}))
    }
  }
  const handlePostersList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files) {
      const previews: string[] = [];
      for (const file of files) {
        previews.push(URL.createObjectURL(file))
      }
      setImages((prevImg) => ({ ...prevImg, postersList: { ...prevImg.postersList, previews: previews, files: [...files]}}))
    }
  }
  const handleRemovePoster = () => {
    setImages((prevImg) => ({...prevImg, poster: { file: null, preview: null, url: null}}))
  }
  const handleRemoveSlide = () => {
    setImages((prevImg) => ({
      ...prevImg,
      slide: { file: null, preview: null, url: null },
    }));
  };
  const handleRemoveFromPostersList = (index: number) => {
    URL.revokeObjectURL(images.postersList.previews[index]);
    setImages((prevImg) => ({ ...prevImg, postersList: { ...prevImg.postersList, previews: prevImg.postersList.previews.filter((_, i) => i !== index), files: prevImg.postersList.files.filter((_, i) => i !== index) } }));
  }
  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setMovieProps((prevState) => ({...prevState, ageRating: value}))
  }

  const toggleCategories = (value: string) => {
    setCategories((prevCat) =>
      prevCat.includes(value)
        ? prevCat.filter((val) => val !== value)
        : [...prevCat, value]
    );
  };

  return (
    <Form noValidate>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          //className="d-flex flex-row flex-wrap justify-content-around mt-5"
        >
          <Row className="d-flex flex-row flex-wrap" xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <p className="movieform-label">Filmtitel</p>
              <TextInput
                controlId={`${formName}.title`}
                label="Filmtitel:"
                type="text"
                placeholder="Filmtitel"
                value={movieProps.title}
                name="title"
                handleOnChange={handleTitleChange}
                isInvalid={false}
                regExp={regExes.title}
                feedback="Ange filmens titel"
              />
            </Col>
            {/* </Row> */}

            <SelectAgeRating
              ageRating={movieProps.ageRating}
              handleAgeChange={handleAgeChange}
            />

            {/* <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <ToggleCategories
                categories={categories}
                toggleCategories={toggleCategories}
              />
            </Col>
            {/* </Row>
            <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Row>
                <Col xs={6}>
                  <p className="movieform-label">Längd</p>
                  <TextInput
                    controlId={`${formName}.duration`}
                    label="Minuter:"
                    type="number"
                    placeholder="Längd"
                    value={movieDetails.duration}
                    name="duration"
                    handleOnChange={handleOnChange}
                    regExp={regExes.duration}
                    isInvalid={true}
                    feedback="Ange filmens längd i minuter"
                  />
                </Col>
                <Col xs={6}>
                  <p className="movieform-label">Utgivningsår</p>
                  <TextInput
                    controlId={`${formName}.releaseYear`}
                    label="ÅÅÅÅ:"
                    type="number"
                    placeholder="År"
                    value={movieDetails.releaseYear}
                    name="releaseYear"
                    handleOnChange={handleOnChange}
                    regExp={movieDetailsRegExes.releaseYear}
                    isInvalid={true}
                    feedback="Ange filmens utgivningsår, ÅÅÅÅ"
                  />
                </Col>
              </Row>
            </Col>
            {/* </Row>
            <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Row>
                <Col xs={6}>
                  <p className="movieform-label">Talat språk</p>
                  <TextInput
                    controlId={`${formName}.spokenLanguage`}
                    label="T.ex. Sv"
                    type="text"
                    placeholder="Talat språk"
                    value={movieDetails.spokenLanguage}
                    name="spokenLanguage"
                    handleOnChange={handleOnChange}
                    regExp={movieDetailsRegExes.spokenLanguage}
                    isInvalid={true}
                    feedback="Ange två- eller treställig språkkod för talat språk, t.ex. En eller Eng"
                  />
                </Col>
                <Col xs={6}>
                  <p className="movieform-label">Undertexter</p>
                  <TextInput
                    controlId={`${formName}.subtitles`}
                    label="T.ex. Sv"
                    type="text"
                    placeholder="Undertexter"
                    value={movieDetails.subtitles}
                    name="subtitles"
                    handleOnChange={handleOnChange}
                    regExp={movieDetailsRegExes.subtitles}
                    isInvalid={true}
                    feedback="Ange två- eller treställig språkkod för undertexter, t.ex. En eller Eng"
                  />
                </Col>
              </Row>
            </Col>
            {/* </Row>
            <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <p className="movieform-label">Rollista</p>
              <TextInput
                controlId={`${formName}.cast`}
                label="T.ex. John Wayne, Marilyn Monroe"
                type="text"
                placeholder="Rollista"
                value={movieDetails.cast}
                name="cast"
                handleOnChange={handleOnChange}
                regExp={movieDetailsRegExes.cast}
                isInvalid={true}
                feedback="Ange en eller flera skådespelare, separerade med kommatecken."
              />
            </Col>
            {/* </Row>
            <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <p className="movieform-label">Regissör(er)</p>
              <TextInput
                controlId={`${formName}.directedBy`}
                label="T.ex. Steven Spielberg"
                type="text"
                placeholder="Regissör: Namn, namn"
                value={movieDetails.directedBy}
                name="directedBy"
                handleOnChange={handleOnChange}
                regExp={movieDetailsRegExes.directedBy}
                isInvalid={true}
                feedback="Ange en eller flera regissörer, separerade med kommatecken."
              />
            </Col>
            {/* </Row>
            <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <p className="movieform-label">Beskrivning/Handling</p>
              <TextInput
                controlId={`${formName}.description`}
                label="Beskrivning/Handling:"
                type="textarea"
                placeholder="Beskrivning"
                value={movieDetails.description}
                name="description"
                handleOnChange={handleOnChange}
                regExp={movieDetailsRegExes.description}
                isInvalid={true}
                feedback="Beskrivning"
              />
            </Col>
            {/* </Row>
            </Col> */}

          {/* Previews */}
          {/* <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="d-flex flex-column justify-content-around gap-4 mt-5"
          > */}
          {/* <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <ImageUpload
                handleImageChange={handleImageChange}
                preview={images.poster.preview}
                file={images.poster.file}
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
          {/* </Row>
          <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <ImageUpload
                handleImageChange={handleImageChange}
                preview={images.slide.preview}
                file={images.slide.file}
                name="slide"
                controlId="slide"
                label="Film slide/bakgrund"
                handleRemoveImage={handleRemoveSlide}
                handleRemoveFromList={handleRemoveFromPostersList}
                desc="Ladda upp en slide/bakgrund. Detta är bilderna som syns i bildspelet på första sidan och som blir bakgrund på visningskorten på förstasidan. Giltiga filformat är .jpg, .png och .webp."
              />
            </Col>
          {/* </Row>
          <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <ImageUpload
                handleImageChange={handlePostersList}
                previewList={images.postersList.previews}
                fileList={images.postersList.files}
                name="postersList"
                controlId="postersList"
                label="Flera filmposters"
                handleRemoveImage={handleRemovePoster}
                handleRemoveFromList={handleRemoveFromPostersList}
                desc="Ladda upp fler filmposters. Dessa kommer visas i bildspelet på filmsidan för denna film. Giltiga filformat är .jpg, .png och .webp."
              />
            </Col>
          {/* </Row>

          <Row> */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <p className="movieform-label">Filmtrailer</p>
              <TextInput
                controlId={`${formName}.trailerURL`}
                label="Länk till filmtrailer på youtube:"
                type="text"
                placeholder="Länk till filmtrailer"
                value={movieDetails.trailerURL}
                name="description"
                handleOnChange={handleOnChange}
                regExp={movieDetailsRegExes.trailerURL}
                isInvalid={true}
                feedback="Filmtrailer"
              />
            </Col>
        {/* </Row>
        </Col> */}

        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Row>
            <Col xs={6} sm={6}>
              <Button variant="outline-secondary w-100">Rensa formulär</Button>
            </Col>
            <Col xs={6} sm={6}>
              <Button variant="outline-secondary w-100">Lägg till film</Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
            affischer/posters till posters och bakgrunder till slides
          </p>
          <p>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>{" "}
            för filmtrailers
          </p>
        </Col>
          </Row>
        </Col>
        </Row>
    </Form>
  );
}