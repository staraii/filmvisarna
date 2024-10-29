import { useState } from "react";
import "./myProfile.css";

// Define a type for booking items
interface Booking {
  movieName: string;
  date: string;
  time: string;
  price: string; // Retaining price in booking for modal usage
  ticketTypes: string; // New field for ticket types
  seats: string; // New field for seats
  numberOfTickets: number; // New field for number of tickets
}

const MinProfil = () => {
  // Temporary data to simulate fetched data
  const currentBookings: Booking[] = [
    { movieName: "Inception", date: "2024-11-01", time: "18:00", price: "120 kr", ticketTypes: "Standard", seats: "A1, A2", numberOfTickets: 2 },
    { movieName: "Titanic", date: "2024-11-03", time: "20:00", price: "110 kr", ticketTypes: "VIP", seats: "B1", numberOfTickets: 1 },
    { movieName: "The Matrix", date: "2024-11-05", time: "19:30", price: "130 kr", ticketTypes: "Standard", seats: "C1, C2", numberOfTickets: 2 },
    { movieName: "Interstellar", date: "2024-11-10", time: "18:00", price: "125 kr", ticketTypes: "Student", seats: "D1", numberOfTickets: 1 },
    // ...additional bookings
  ];

  const pastBookings: Booking[] = [
    { movieName: "Avatar", date: "2023-12-20", time: "16:00", price: "100 kr", ticketTypes: "Standard", seats: "E1, E2", numberOfTickets: 2 },
    { movieName: "The Godfather", date: "2023-12-22", time: "21:00", price: "90 kr", ticketTypes: "VIP", seats: "F1", numberOfTickets: 1 },
    { movieName: "Pulp Fiction", date: "2023-12-24", time: "20:30", price: "110 kr", ticketTypes: "Standard", seats: "G1, G2", numberOfTickets: 2 },
    { movieName: "Forrest Gump", date: "2023-12-25", time: "18:00", price: "95 kr", ticketTypes: "Student", seats: "H1", numberOfTickets: 1 },
    { movieName: "The Dark Knight", date: "2023-12-26", time: "19:00", price: "105 kr", ticketTypes: "VIP", seats: "I1, I2", numberOfTickets: 2 },
    { movieName: "Fight Club", date: "2023-12-27", time: "22:00", price: "115 kr", ticketTypes: "Standard", seats: "J1", numberOfTickets: 1 },
    // ...additional past bookings
  ];

  // Modal and booking state
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // Use the Booking type or null

  // Pagination state
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [pastBookingPage, setPastBookingPage] = useState(1);

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

  // Function to change page
  const handlePageChange = (setPage: React.Dispatch<React.SetStateAction<number>>, page: number) => {
    setPage(page); // Update current page directly without transition
  };

  // Function to open modal with selected booking details
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="profile-container">
      {/* Welcome Section */}
      <div className="profile-section">
        <h2>Välkommen, Alex</h2>
        <form className="profile-form">
          {/* Inputs removed as requested */}
        </form>
      </div>
      <hr /> {/* Horizontal line between sections */}
      
      {/* Current Bookings Section */}
      <div className="profile-section">
        <h2>Bokningar</h2>
        <div className="content"> {/* Removed transition classes */}
          <table className="profile-table">
            <thead>
              <tr>
                <th>Filmtitel</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              {currentBookingsToShow.map((booking, index) => (
                <tr key={index} onClick={() => handleBookingClick(booking)}>
                  <td>{booking.movieName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <button
                      className="cancel-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening
                        console.log("Booking canceled for", booking.movieName);
                      }}
                    >
                      Avboka
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div className="content"> {/* Removed transition classes */}
          <table className="profile-table">
            <thead>
              <tr>
                <th>Filmtitel</th>
                <th>Datum</th>
                <th>Tid</th>
              </tr>
            </thead>
            <tbody>
              {pastBookingsToShow.map((booking, index) => (
                <tr key={index} onClick={() => handleBookingClick(booking)}>
                  <td>{booking.movieName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* Modal for Booking Details */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Bokningsdetaljer</h2>
            {selectedBooking && (
              <div>
                <p><strong>Film:</strong> {selectedBooking.movieName}</p>
                <p><strong>Datum:</strong> {selectedBooking.date}</p>
                <p><strong>Tid:</strong> {selectedBooking.time}</p>
                <p><strong>Pris:</strong> {selectedBooking.price}</p>
                <p><strong>Biljettyper:</strong> {selectedBooking.ticketTypes}</p>
                <p><strong>Platser:</strong> {selectedBooking.seats}</p>
                <p><strong>Antal biljetter:</strong> {selectedBooking.numberOfTickets}</p>
              </div>
            )}
            <button className="close-modal-button" onClick={handleCloseModal}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinProfil;













