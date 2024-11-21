import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import TextInput from "../TextInput/TextInput";
import { Review, RegExes, TextInputParamsList } from "../../../AdminTypes";


const REVIEW_DEFAULT: Review = {
  reviewBy: "",
  review: "",
  rating: "",
}

const regExes: RegExes = {
  rating: /^[1-5]$/,
  reviewBy: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
  review: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
  // escapeQuotes: (string: string) => {
  //   return string.replace(/"/g, '\\"');
  // }
};

const reviewInputParams: TextInputParamsList = {
  reviewBy: {
    controlId: "reviewBy",
    label: "Skriven av ",
    type: "text",
    name: "reviewBy",
    feedback: "Ange vem som skrivit recensionen",
  },
  review: {
    controlId: "review",
    label: "Recension ",
    type: "text",
    name: "review",
    feedback: "Ange recension",
  },
};

const HIGHEST_RATING = 5;


export default function NewReview({
  addReview,
  handleTouched,
  touched,
  handleUntouchReview,
}: {
  addReview: (newReview: Review) => void;
    handleTouched: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    touched: { [key: string]: boolean };
    handleUntouchReview: () => void;
}) {
  const [review, setReview] = useState<Review>(REVIEW_DEFAULT);
  const [isValid, setIsValid] = useState<{ [key: string]: boolean }>({});
  const [isOpen, setIsOpen] = useState(false);
  const checkIfValid = (name: string, value: string) => {
    setIsValid((prevInvalid) => ({
      ...prevInvalid,
      [name]: regExes[name].test(value) ? true : false,
    }));
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    checkIfValid(name, value);
    setReview((prevRev) => ({ ...prevRev, [name]: value }));
  };
  const handleAddReview = () => {
    addReview({
      review: review.review,
      reviewBy: review.reviewBy,
      rating: review.rating,
    });
    setReview(REVIEW_DEFAULT);
    setIsValid({});
    handleUntouchReview();
    setIsOpen(false);
  };

  return (
    <Row className="px-4">
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="border border-secondary rounded mt-4 p-4 d-flex flex-column justify-content-between gap-3"
      >
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Row>
              <Col
                xs={8}
                sm={10}
                md={8}
                lg={10}
                xl={10}
                xxl={10}
                className="d-flex flex-row align-items-center"
              >
                <p className="text-secondary fs-4 fw-bold m-0">
                  Lägg till ny Recension
                </p>
              </Col>
              <Col
                xs={4}
                sm={2}
                md={4}
                lg={2}
                xl={2}
                xxl={2}
                className="p-0 d-flex flex-row justify-content-center align-items-center"
              >
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setIsOpen(!isOpen)}
                  className="my-auto"
                >
                  {isOpen ? "Dölj" : "Visa"}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {isOpen && (
          <>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <p className="movieform-label">Skriven av</p>
                <TextInput
                  value={review.reviewBy}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.reviewBy && touched.reviewBy}
                  params={reviewInputParams.reviewBy}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <p>Betyg</p>
                <ButtonGroup>
                  {Array.from({ length: HIGHEST_RATING }, (_, index) => (
                    <ToggleButton
                      key={index}
                      id={`rating-radio-${index}`}
                      type="radio"
                      variant="outline-secondary"
                      name="rating"
                      value={`${index + 1}`}
                      checked={review.rating === `${index + 1}`}
                      onChange={handleOnChange}
                    >
                      {index + 1}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <p className="movieform-label">Recension</p>
                <TextInput
                  value={review.review}
                  handleOnChange={handleOnChange}
                  handleTouched={handleTouched}
                  isInvalid={!isValid.review && touched.review}
                  params={reviewInputParams.review}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <Button
                  variant="outline-secondary w-100"
                  disabled={
                    !(isValid.review && isValid.reviewBy && isValid.rating)
                  }
                  onClick={handleAddReview}
                >
                  Lägg till recension
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
}