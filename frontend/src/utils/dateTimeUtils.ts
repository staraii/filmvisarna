
// --- Getting swedish weekday for screenings ----
const SWEDISH_WEEKDAY_NAMES: { [key: string]: string } = {
  Monday: "Mån",
  Tuesday: "Tis",
  Wednesday: "Ons",
  Thursday: "Tors",
  Friday: "Fre",
  Saturday: "Lör",
  Sunday: "Sön",
};
// Get weekday in swedish format "Mån", "Tis" etc from full weekday names in english "Monday", "Tuesday" etc. as returned from database table screenings
export function getWeekday(engDay: string){
  return SWEDISH_WEEKDAY_NAMES[engDay];
};


// --- Get full swedish weekday name ----
const FULL_SWEDISH_WEEKDAY_NAMES: { [key: string]: string } = {
  Monday: "Måndag",
  Tuesday: "Tisdag",
  Wednesday: "Onsdag",
  Thursday: "Torsdag",
  Friday: "Fredag",
  Saturday: "Lördag",
  Sunday: "Söndag",
}
export function getFullWeekDay(engDay: string) {
  return FULL_SWEDISH_WEEKDAY_NAMES[engDay];
}



// --- Generate valid dates, for screenings ---
type ScreeningDate = {
  searchDate: string; // date for using in db query
  selectString: string; // date for the UI filter component
};
// when using js method getDay(), returned value is 0-6 where 0 is sunday
const WEEKDAY_NAMES = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];
// when using js method getMonth() returned value is 0-11
const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
// returns the number of dates set in "days" starting from "startDate"
// returned dates in format 2024-01-01
export const getScreeningDates = (startDate: Date, days: number) => {
  const dates: ScreeningDate[] = [];
  for (let i = 0; i < days; i++){
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
  
    const year = nextDate.getFullYear();
    const month = nextDate.getMonth();
    const date = nextDate.getDate();
    const dayName = nextDate.getDay();

    dates.push({ searchDate: `${year}-${MONTHS[month]}-${date < 10 ? `0${date}` : date}`, selectString: `${WEEKDAY_NAMES[dayName]} ${date}/${MONTHS[month]}`})
  }
  return dates;
}


export const getFilterDisplayDate = (inputDate: string) => {
  const newDate = new Date(inputDate)
  //const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const dayName = WEEKDAY_NAMES[newDate.getDay()];
  return `${dayName} ${date}/${month}`

}