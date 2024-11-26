import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInput from "../TextInput/TextInput";
import SelectAgeRating from "../SelectAgeRating/SelectAgeRating";
import ToggleCategories from "../ToggleCategories/ToggleCategories";
import Form from "react-bootstrap/Form";
import { TextInputParamsList, Movie } from "../../../AdminTypes";


interface FormInputsProps {
  movie: Movie;
  categories: string[];
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  toggleCategories: (value: string) => void;
  handleTouched: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  touched: { [key: string]: boolean };
  isInvalid: { [key: string]: boolean };
}


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





export default function FormInputs({ movie, categories, handleOnChange, toggleCategories, handleTouched, touched, isInvalid }: FormInputsProps) {

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
                  isInvalid={isInvalid.title && touched.title}
                  params={textInputProps.title}
                />
              </Col>
            </Row>

            {/* Åldersgräns */}
            <Row>
              <SelectAgeRating
                ageRating={movie.ageRating}
                onChangeHandler={handleOnChange}
                isInvalid={isInvalid.ageRating && touched.ageRating}
                handleTouched={handleTouched}
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
                      isInvalid={isInvalid.duration && touched.duration}
                      params={textInputProps.duration}
                    />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <p className="movieform-label">Utgivningsår</p>
                    <TextInput
                      value={movie.releaseYear}
                      handleOnChange={handleOnChange}
                      handleTouched={handleTouched}
                      isInvalid={isInvalid.releaseYear && touched.releaseYear}
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
                        isInvalid.spokenLanguage && touched.spokenLanguage
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
                      isInvalid={isInvalid.subtitles && touched.subtitles}
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
                  isInvalid={isInvalid.cast && touched.cast}
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
                  isInvalid={isInvalid.directedBy && touched.directedBy}
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
                  isInvalid={isInvalid.description && touched.description}
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
                  isInvalid={isInvalid.trailerURL && touched.trailerURL}
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