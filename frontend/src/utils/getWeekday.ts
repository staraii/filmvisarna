

export default function getWeekday(engDay: string){
  const weekdayNames: { [key: string]: string } = {
    Monday: "Mån",
    Tuesday: "Tis",
    Wednesday: "Ons",
    Thursday: "Tors",
    Friday: "Fre",
    Saturday: "Lör",
    Sunday: "Sön",
  };
  return weekdayNames[engDay];
};