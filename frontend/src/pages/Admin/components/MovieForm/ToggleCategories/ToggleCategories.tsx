import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ToggleButtonGroup } from "react-bootstrap";

const categoriesList =
  [
    { name: "Action", value: "5" },
    { name: "Animerat", value: "6" },
    { name: "Äventyr", value: "7" },
    { name: "Barnfilm", value: "8" },
    { name: "Drama", value: "9" },
    { name: "Fantasy", value: "10" },
    { name: "Komedi", value: "11" },
    { name: "Romantik", value: "12" },
    { name: "Sci-fi", value: "13" },
    { name: "Svensk", value: "14" },
    { name: "Thriller", value: "15" }
  ];

interface ToggleCategoriesProps {
  categories: string[];
  toggleCategories: (value: string) => void;
}  
export default function ToggleCategories({categories, toggleCategories}: ToggleCategoriesProps) {
  
  return (
    <Row>
      <Col className="border border-secondary rounded mx-3 mt-4 py-3">
        <Row>
          <Col>Kategorier</Col>
        </Row>
        <Row>
          <Col xs={12} className="d-flex flex-row flex-wrap">
            <ToggleButtonGroup type="checkbox" role="Filmkategorier" aria-label="Filmkategorier">
              <Row
                className="d-flex flex-row flex-wrap justify-content-around mt-4"
              >
                <Col xs={12} className="d-flex flex-row flex-wrap gap-2">
                  {categoriesList.map((cat, index) => (
                    <ToggleButton
                      key={index}
                      id={`tgb-${cat.name}`}
                      variant="outline-secondary"
                      value={index}
                      name="kategorier"
                      type="checkbox"
                      onChange={() => toggleCategories(cat.value)}
                      checked={categories.includes(cat.value)}
                      size="sm"
                    >
                      {cat.name}
                    </ToggleButton>
                  ))}
                </Col>
              </Row>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}