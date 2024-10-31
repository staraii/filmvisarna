import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../utils/authContext";
import { fetchUserBookings, cancelBooking } from "../../utils/queryService";
import "./myProfile.css";

// Define a Booking interface according to the fetched data structure
interface Booking {
  bookingId: number; // Update to match your fetched data
  bookingNumber: string;
  screeningId: number;
  screeningTime: string; // Assuming this is the date and time
  movieTitle: string; // The movie name
  // Add any other relevant fields here as needed
}

const MinProfil = () => {
  const { userEmail } = useAuth(); // Get user email from context
  console.log("User Email:", userEmail);

  // Fetch user bookings with React Query
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ["userBookings", userEmail],
    queryFn: () => fetchUserBookings(userEmail),
    enabled: !!userEmail, // Only run the query if userEmail exists
    retry: 1,
  });

  // States for current and past bookings
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [pastBookingPage, setPastBookingPage] = useState(1);

  const itemsPerPage = 5; // Items to display per page

  // Separate bookings into current and past based on the screening time
  useEffect(() => {
    if (bookings) {
      const now = new Date();
      const current = bookings.filter((booking) => new Date(booking.screeningTime) >= now);
      const past = bookings.filter((booking) => new Date(booking.screeningTime) < now);
      setCurrentBookings(current);
      setPastBookings(past);
    }
  }, [bookings]);

  // Cancel booking and refetch data
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      refetch(); // Refresh bookings after cancellation
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Handle modal display for booking details
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const paginate = (bookings: Booking[], page: number) => {
    const indexOfLast = page * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return bookings.slice(indexOfFirst, indexOfLast); // Return the sliced bookings for pagination
  };

  // UI conditions for loading, error, and no bookings
  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error fetching bookings: {(error as Error).message}</div>;

  return (
    <div className="profile-container">
      <div className="profile-section">
        <h2>Welcome, {userEmail}</h2>
      </div>
      <hr />

      {/* Current Bookings Section */}
      <div className="profile-section">
        <h2>Current Bookings</h2>
        {currentBookings.length === 0 ? (
          <p>No current bookings found.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(currentBookings, currentBookingPage)}
              onBookingClick={handleBookingClick}
              onCancelBooking={handleCancelBooking}
            />
            <Pagination
              totalPages={Math.ceil(currentBookings.length / itemsPerPage)}
              currentPage={currentBookingPage}
              setPage={setCurrentBookingPage}
            />
          </>
        )}
      </div>
      <hr />

      {/* Past Bookings Section */}
      <div className="profile-section">
        <h2>Booking History</h2>
        {pastBookings.length === 0 ? (
          <p>No past bookings found.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(pastBookings, pastBookingPage)}
              onBookingClick={handleBookingClick}
            />
            <Pagination
              totalPages={Math.ceil(pastBookings.length / itemsPerPage)}
              currentPage={pastBookingPage}
              setPage={setPastBookingPage}
            />
          </>
        )}
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// BookingTable component for current/past bookings
const BookingTable = ({ bookings, onBookingClick, onCancelBooking }) => (
  <div className="content">
    <table className="profile-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Screening Time</th>
          <th>Booking Number</th>
          {onCancelBooking && <th>Action</th>} {/* Show cancel button only for current bookings */}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.bookingId} onClick={() => onBookingClick(booking)}>
            <td>{booking.movieTitle}</td>
            <td>{new Date(booking.screeningTime).toLocaleString()}</td> {/* Format date */}
            <td>{booking.bookingNumber}</td> {/* Display booking number */}
            {onCancelBooking && (
              <td>
                <button
                  className="cancel-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click event
                    onCancelBooking(booking.bookingId.toString());
                  }}
                >
                  Cancel
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Pagination component
const Pagination = ({ totalPages, currentPage, setPage }) => (
  <div className="pagination">
    {[...Array(totalPages).keys()].map((num) => (
      <button
        key={num}
        onClick={() => setPage(num + 1)}
        className={currentPage === num + 1 ? "active" : ""}
      >
        {num + 1}
      </button>
    ))}
  </div>
);

// BookingModal component
const BookingModal = ({ booking, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>Booking Details</h2>
      <div>
        <p><strong>Title:</strong> {booking.movieTitle}</p>
        <p><strong>Screening Time:</strong> {new Date(booking.screeningTime).toLocaleString()}</p>
        <p><strong>Booking Number:</strong> {booking.bookingNumber}</p>
        {/* Add any additional details you want to display here */}
      </div>
      <button className="close-modal-button" onClick={onClose}>Close</button>
    </div>
  </div>
);

export default MinProfil;


























