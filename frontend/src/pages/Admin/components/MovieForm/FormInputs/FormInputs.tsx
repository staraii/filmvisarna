import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInput from "../TextInput/TextInput";
import SelectAgeRating from "../SelectAgeRating/SelectAgeRating";
import ToggleCategories from "../ToggleCategories/ToggleCategories";
import Form from "react-bootstrap/Form";
import { TextInputParamsList } from "../../../AdminTypes";

type MovieRegExes = { [key: string]: RegExp };


const regExes: MovieRegExes = {
  id: /^[1-9][0-9]*$/,
  duration: /^[1-9][0-9]*$/,
  title: /^[a-zA-ZåäöÅÄÖ0-9.,&\-" ]+$/,
  cast: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  directedBy: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  subtitles: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  spokenLanguage: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  description: /^[a-zA-ZåäöÅÄÖ0-9.,&\-" ]+$/,
  releaseYear: /^19[0-9][0-9]$/,
  ageRating: /^(?:1|7|11|15)$/,
  posterURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  slideURL: /^[a-zA-z0-9]+.(?:jpg|png|webp)$/,
  trailerURL: new RegExp(
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/,
    "gim"
  ),
  rating: /^[1-5]$/,
  reviewBy: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
  review: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
};



interface Movie {
  id: number | null;
  title: string;
  ageRating: string;
  createdAt: string | null;
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
  [key: string]: string | string[] | null | File | File[] | number;
}


interface FormInputsProps {
  movie: Movie;
  categories: string[];
  onChangeHandler: (name: string, value: string) => void;
  toggleCategories: (value: string) => void;
}
type Touched = { [key: string]: boolean };
type IsValid = { [key: string]: boolean };



const textInputProps: TextInputParamsList = {
  title: {
    controlId: "title",
    label: "Filmtitel: ",
    type: "text",
    name: "title",
    feedback: "Ange filmens titel",
  },
  duration: {
    controlId: "duration",
    label: "Minuter: ",
    type: "number",
    name: "duration",
    feedback: "Ange filmens längd i minuter",
  },
  releaseYear: {
    controlId: "releaseYear",
    label: "ÅÅÅÅ: ",
    type: "number",
    name: "releaseYear",
    feedback: "Ange filmens utgivningsår, ÅÅÅÅ",
  },
  spokenLanguage: {
    controlId: "spokenLanguage",
    label: "T.ex. Sv",
    type: "text",
    name: "spokenLanguage",
    feedback:
      "Ange två- eller treställig språkkod för talat språk, t.ex. En eller Eng",
  },
  subtitles: {
    controlId: "subtitles",
    label: "T.ex. Sv",
    type: "text",
    name: "subtitles",
    feedback:
      "Ange två- eller treställig språkkod för undertexter, t.ex. En eller Eng",
  },
  cast: {
    controlId: "cast",
    label: "T.ex. John Wayne, Marilyn Monroe",
    type: "text",
    name: "cast",
    feedback: "Ange en eller flera skådespelare, separerade med kommatecken",
  },
  directedBy: {
    controlId: "directedBy",
    label: "T.ex. Steven Spielberg",
    type: "text",
    name: "directedBy",
    feedback: "Ange en eller flera regissörer, separerade med kommatecken",
  },
  description: {
    controlId: "description",
    label: "Beskrivning/Handling: ",
    type: "textarea",
    name: "description",
    feedback: "Ange en beskrivande text om filmen och/eller dess handling",
  },
  trailerURL: {
    controlId: "trailerURL",
    label:
      "https://www.youtube.com/watch?v=CHekzSiZjrY",
    type: "text",
    name: "trailerURL",
    feedback: "Ange länk till filmtrailer på youtube",
  },
};









export default function FormInputs({ movie, categories, onChangeHandler, toggleCategories }: FormInputsProps) {
  const [touched, setTouched] = useState<Touched>({});
  const [isValid, setIsValid] = useState<IsValid>({});
  const handleTouched = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.currentTarget;
    setTouched((prevTouch) => ({ ...prevTouch, [name]: true }));
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    handleIsValid(name, value);
    onChangeHandler(name, value);
  }
  const handleIsValid = (name: string, value: string) => {
      setIsValid((prevValid) => ({...prevValid, [name]: regExes[name].test(value) ? true : false}))
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Form noValidate>
            {/* Filmtitel */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
                style={{}}
              >
                <p className="movieform-label">Filmtitel</p>
                <TextInput
                  value={movie.title}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.title && touched.title}
                  params={textInputProps.title}
                />
              </Col>
            </Row>

            {/* Åldersgräns */}
            <Row>
              <SelectAgeRating
                ageRating={movie.ageRating}
                onChangeHandler={handleOnChange}
              />
            </Row>

            {/* Kategorier */}
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <ToggleCategories
                  categories={categories}
                  toggleCategories={toggleCategories}
                />
              </Col>
            </Row>

            {/* Längd & Utgivningsår */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <p className="movieform-label">Längd</p>
                    <TextInput
                      value={movie.duration}
                      handleOnChange={handleOnChange}
                      handleTouched={handleTouched}
                      isInvalid={!isValid.duration && touched.duration}
                      params={textInputProps.duration}
                    />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <p className="movieform-label">Utgivningsår</p>
                    <TextInput
                      value={movie.releaseYear}
                      handleOnChange={handleOnChange}
                      handleTouched={handleTouched}
                      isInvalid={!isValid.releaseYear && touched.releaseYear}
                      params={textInputProps.releaseYear}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* Talat språk & Undertexter */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <p className="movieform-label">Talat språk</p>
                    <TextInput
                      value={movie.spokenLanguage}
                      handleOnChange={handleOnChange}
                      handleTouched={handleTouched}
                      isInvalid={
                        !isValid.spokenLanguage && touched.spokenLanguage
                      }
                      params={textInputProps.spokenLanguage}
                    />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <p className="movieform-label">Undertexter</p>
                    <TextInput
                      value={movie.subtitles}
                      handleOnChange={handleOnChange}
                      handleTouched={handleTouched}
                      isInvalid={!isValid.subtitles && touched.subtitles}
                      params={textInputProps.subtitles}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Rollista */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <p className="movieform-label">Rollista</p>
                <TextInput
                  value={movie.cast}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.cast && touched.cast}
                  params={textInputProps.cast}
                />
              </Col>
            </Row>

            {/* Regissör */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <p className="movieform-label">Regissör(er)</p>
                <TextInput
                  value={movie.directedBy}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.directedBy && touched.directedBy}
                  params={textInputProps.directedBy}
                />
              </Col>
            </Row>

            {/* Beskrivning / Handling */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <p className="movieform-label">Beskrivning/Handling</p>
                <TextInput
                  value={movie.description}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.description && touched.description}
                  params={textInputProps.description}
                />
              </Col>
            </Row>
            {/* Trailer url */}
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="my-3"
              >
                <p className="movieform-label">Filmtrailer</p>
                <TextInput
                  value={movie.trailerURL}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.trailerURL && touched.trailerURL}
                  params={textInputProps.trailerURL}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}