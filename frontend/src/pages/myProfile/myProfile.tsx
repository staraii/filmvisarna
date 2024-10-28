import { useState } from "react";
import "./myProfile.css";

const MinProfil = () => {
  // Temporary data to simulate fetched data
  const currentBookings = [
    { movieName: "Inception", date: "2024-11-01", time: "18:00", price: "120 kr" },
    { movieName: "Titanic", date: "2024-11-03", time: "20:00", price: "110 kr" },
    { movieName: "The Matrix", date: "2024-11-05", time: "19:30", price: "130 kr" },
    { movieName: "Interstellar", date: "2024-11-10", time: "18:00", price: "125 kr" },
    // ...additional bookings
  ];

  const pastBookings = [
    { movieName: "Avatar", date: "2023-12-20", time: "16:00", price: "100 kr" },
    { movieName: "The Godfather", date: "2023-12-22", time: "21:00", price: "90 kr" },
    { movieName: "Pulp Fiction", date: "2023-12-24", time: "20:30", price: "110 kr" },
    { movieName: "Forrest Gump", date: "2023-12-25", time: "18:00", price: "95 kr" },
    { movieName: "The Dark Knight", date: "2023-12-26", time: "19:00", price: "105 kr" },
    { movieName: "Fight Club", date: "2023-12-27", time: "22:00", price: "115 kr" },
    // ...additional past bookings
  ];

  // Pagination state
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [pastBookingPage, setPastBookingPage] = useState(1);
  
  // State for transitions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Pagination constants
  const itemsPerPage = 5;

  // Pagination logic for current bookings
  const indexOfLastBooking = currentBookingPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookingsToShow = currentBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalBookingPages = Math.ceil(currentBookings.length / itemsPerPage);

  // Pagination logic for past bookings
  const indexOfLastPastBooking = pastBookingPage * itemsPerPage;
  const indexOfFirstPastBooking = indexOfLastPastBooking - itemsPerPage;
  const pastBookingsToShow = pastBookings.slice(indexOfFirstPastBooking, indexOfLastPastBooking);
  const totalPastBookingPages = Math.ceil(pastBookings.length / itemsPerPage);

  // Function to change page with transition
  const handlePageChange = (setPage, page) => {
    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setPage(page); // Update current page after transition
      setIsTransitioning(false); // End transition
    }, 500); // Match this duration with CSS transition duration
  };

  return (
    <div className="profile-container">
      {/* Welcome Section */}
      <div className="profile-section">
        <h2>Välkommen Alex</h2>
        <form className="profile-form">
          {/* Inputs removed as requested */}
        </form>
      </div>
      <hr /> {/* Horizontal line between sections */}
      
      {/* Current Bookings Section */}
      <div className="profile-section">
        <h2>Bokningar</h2>
        <div className={`content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Filmtitel</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Pris</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              {currentBookingsToShow.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.movieName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.price}</td>
                  <td>
                    <button className="cancel-button">Avboka</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Show pagination only if there are more than 5 bookings */}
        {totalBookingPages > 1 && (
          <div className="pagination">
            {[...Array(totalBookingPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(setCurrentBookingPage, num + 1)}
                className={currentBookingPage === num + 1 ? "active" : ""}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <hr /> {/* Horizontal line between sections */}
      
      {/* Past Bookings Section */}
      <div className="profile-section">
        <h2>Boknings Historik</h2>
        <div className={`content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Filmtitel</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {pastBookingsToShow.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.movieName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Show pagination only if there are more than 5 past bookings */}
        {totalPastBookingPages > 1 && (
          <div className="pagination">
            {[...Array(totalPastBookingPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(setPastBookingPage, num + 1)}
                className={pastBookingPage === num + 1 ? "active" : ""}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinProfil;








