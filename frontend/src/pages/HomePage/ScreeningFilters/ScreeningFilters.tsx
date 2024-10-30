import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import { getScreeningDates } from "../../../utils/dateTimeUtils";
import { ageRatingFilterUtil } from "../../../utils/ageRatingUtil";
//import { ScreeningFiltersState } from "../HomePage";

interface ScreeningFilters {
  filters: {
    date: string;
    age: string;
    theatre: number[];
    urlPrefix: string;
    filteredQuery: string;
    dateString: string | null;
  },
  handleFilterChange: (type: string, value: string | number[], dateString: string | null) => void;
}


const screeningDates = getScreeningDates(new Date(), 28);

export default function ScreeningFilters({ filters, handleFilterChange }: ScreeningFilters) {
  const selectedAge = ageRatingFilterUtil(filters.age);
  return (
    <Row className="sticky-top bg-body top-outline mb-5">
      <Stack direction="vertical" gap={3} className="py-3">
        {/* Date and Age filter */}
        <Stack direction="horizontal" gap={3}>
          {/* Date filter */}
          <Dropdown className="mx-auto">
            {/* <Dropdown.Toggle variant="outline-secondary" id="Datum"> */}
            <Dropdown.Toggle variant={filters.date === "ALL" ? "outline-secondary" : "secondary"} id="Datum" className="">
              {!filters.dateString ? "Datum" : filters.dateString}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Dropdown.Item
                as="button"
                eventKey="ALL"
                active={filters.date === "ALL"}
                onClick={() => handleFilterChange("date", "ALL", null)}
              >
                Alla datum
              </Dropdown.Item>
              {screeningDates.map((date) => (
                <Dropdown.Item
                  as="button"
                  eventKey={date.searchDate}
                  key={date.searchDate}
                  active={filters.date === date.searchDate}
                  onClick={() => handleFilterChange("date", date.searchDate, date.selectString)}
                >
                  {date.selectString}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Age filter */}
          <DropdownButton
            id="Åldergräns"
            title={filters.age === "ALL" ? "Åldersgräns" : selectedAge}
            className="mx-auto"
            variant={filters.age === "ALL" ? "outline-secondary" : "secondary"}
            onSelect={(e) => handleFilterChange("age", e as string, null)}
          >
            <Dropdown.Item
              as="button"
              eventKey="ALL"
              active={filters.age === "ALL"}
            >
              Alla åldrar
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="1"
              active={filters.age === "1"}
            >
              Barntillåten
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="7"
              active={filters.age === "7"}
            >
              Från 7 år
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="11"
              active={filters.age === "11"}
            >
              Från 11 år
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="15"
              active={filters.age === "15"}
            >
              Från 15 år
            </Dropdown.Item>
          </DropdownButton>
        </Stack>

        {/* Theatre filter */}
        <ToggleButtonGroup
          type="checkbox"
          value={filters.theatre}
          onChange={(e) => handleFilterChange("theatre", e as number[], null)}
          className="align-center justify-content-between"
        >
          <ToggleButton id="tbg-btn-1" value={1} variant="outline-secondary">
            Stora Salongen
          </ToggleButton>
          <ToggleButton id="tbg-btn-2" value={2} variant="outline-secondary">
            Lilla Salongen
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Row>
  );
}
