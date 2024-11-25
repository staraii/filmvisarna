import screeningsService from "../services/screeningsService.js";

//format to db dateTime
function formatTime(date: Date) {
  const formatDate = Intl.DateTimeFormat(`en-SE`, {
    timeZone: `Europe/Stockholm`,
    dateStyle: `short`,
  })
    .format(date)
    .replace(`,`, ``)
    .split(` `)[0];

  return formatDate;
}

//current date + days
function dateIncrement(days: number) {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);

  const date = formatTime(newDate);
  return date;
}

const Screenings = [
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(0)} 18:30:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(0)} 21:00:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(0)} 21:00:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(0)} 21:00:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(1)} 18:30:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(1)} 18:30:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(1)} 21:00:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(1)} 21:00:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(2)} 18:30:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(2)} 18:30:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(2)} 21:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(2)} 21:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(3)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(3)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(3)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(3)} 21:00:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(4)} 18:30:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(4)} 18:30:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(4)} 21:00:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(4)} 21:00:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(5)} 14:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(5)} 14:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(5)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(5)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(5)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(5)} 21:00:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(6)} 14:00:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(6)} 14:00:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(6)} 18:30:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(6)} 18:30:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(6)} 21:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(6)} 21:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(7)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(7)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(7)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(7)} 21:00:00` },

  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(8)} 18:30:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(8)} 21:00:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(8)} 21:00:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(8)} 21:00:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(9)} 18:30:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(9)} 18:30:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(9)} 21:00:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(9)} 21:00:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(10)} 18:30:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(10)} 18:30:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(10)} 21:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(10)} 21:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(11)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(11)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(11)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(11)} 21:00:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(12)} 18:30:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(12)} 18:30:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(12)} 21:00:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(12)} 21:00:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(13)} 14:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(13)} 14:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(13)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(13)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(13)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(13)} 21:00:00` },
  { movieId: 1, theatreId: 2, dateTime: `${dateIncrement(14)} 14:00:00` },
  { movieId: 2, theatreId: 1, dateTime: `${dateIncrement(14)} 14:00:00` },
  { movieId: 3, theatreId: 2, dateTime: `${dateIncrement(14)} 18:30:00` },
  { movieId: 4, theatreId: 1, dateTime: `${dateIncrement(14)} 18:30:00` },
  { movieId: 5, theatreId: 2, dateTime: `${dateIncrement(14)} 21:00:00` },
  { movieId: 1, theatreId: 1, dateTime: `${dateIncrement(14)} 21:00:00` },
  { movieId: 2, theatreId: 2, dateTime: `${dateIncrement(15)} 18:30:00` },
  { movieId: 3, theatreId: 1, dateTime: `${dateIncrement(15)} 18:30:00` },
  { movieId: 4, theatreId: 2, dateTime: `${dateIncrement(15)} 21:00:00` },
  { movieId: 5, theatreId: 1, dateTime: `${dateIncrement(15)} 21:00:00` },
];

export default async function seedScreening() {
  try {
    for (let i = 0; i < Screenings.length; i++) {
      await screeningsService.createScreening(Screenings[i]);
    }
  } catch (error) {
    console.error("Error running seed script", error);
  }
  console.log("Seeding ran successful: 2 weeks added");
}
