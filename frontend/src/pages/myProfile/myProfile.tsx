import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../utils/authContext";
import { fetchUserBookings } from "../../utils/queryService";
import Pagination from 'react-bootstrap/Pagination'; // Import Bootstrap pagination
import "./myProfile.css";
import { cancelBooking } from "../../services/authService";

// Define a Booking interface according to the fetched data structure
interface Booking {
  bookingId: number; // Unique ID for the booking
  bookingNumber: string; // Booking reference number
  screeningId: number; // ID of the screening
  screeningTime: string; // Screening date and time (ISO 8601 format)
  movieTitle: string; // Name of the movie
  seats: string[]; // Array of seat numbers
  bookingDate: string; // The date when the booking was made
}

const MinProfil = () => {
  const { userEmail, firstName, fetchUserData } = useAuth();
  console.log("User Email:", userEmail);
  console.log("User Name:", firstName);

  // Fetch user bookings with React Query
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ["userBookings", userEmail],
    queryFn: () => fetchUserBookings(userEmail!),
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

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, [fetchUserData]);

  // Separate bookings into current and past based on the screening time
  useEffect(() => {
    if (bookings) {
      const now = new Date();
      const current = bookings.filter((booking: Booking) => new Date(booking.screeningTime) >= now);
      const past = bookings.filter((booking: Booking) => new Date(booking.screeningTime) < now);
      setCurrentBookings(current);
      setPastBookings(past);
    }
  }, [bookings]);

  // Cancel booking and refetch data
  const handleCancelBooking = async (bookingId: number, bookingNumber: string) => {
    try {
      if (!userEmail) {
        throw new Error("User email is not defined.");
      }
      await cancelBooking(bookingId, userEmail, bookingNumber); // Ensure userEmail is not null or undefined
      refetch(); // Refresh bookings after cancellation
    } catch (error) {
      console.error("Fel vid avbokning:", error);
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
  if (isLoading) return <div>Laddar bokningar...</div>;
  if (error) return <div>Fel vid hämtning av bokningar: {(error as Error).message}</div>;

  return (
    <div className="profile-container">
      <div className="profile-section">
        <p>Välkommen, {firstName || userEmail}</p>
      </div>
      <hr />

      {/* Current Bookings Section */}
      <div className="profile-section">
        <h2>Aktuella Bokningar</h2>
        {currentBookings.length === 0 ? (
          <p>Inga aktuella bokningar hittades.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(currentBookings, currentBookingPage)}
              onBookingClick={handleBookingClick}
              onCancelBooking={handleCancelBooking}
            />
            {/* Show pagination only if there are more than itemsPerPage bookings */}
            {currentBookings.length > itemsPerPage && (
              <CustomPagination
                totalPages={Math.ceil(currentBookings.length / itemsPerPage)}
                currentPage={currentBookingPage}
                setPage={setCurrentBookingPage}
              />
            )}
          </>
        )}
      </div>
      <hr />

      {/* Past Bookings Section */}
      <div className="profile-section">
        <h2>Bokningshistorik</h2>
        {pastBookings.length === 0 ? (
          <p>Inga tidigare bokningar hittades.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(pastBookings, pastBookingPage)}
              onBookingClick={handleBookingClick}
            />
            {/* Show pagination only if there are more than itemsPerPage bookings */}
            {pastBookings.length > itemsPerPage && (
              <CustomPagination
                totalPages={Math.ceil(pastBookings.length / itemsPerPage)}
                currentPage={pastBookingPage}
                setPage={setPastBookingPage}
              />
            )}
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

interface BookingTableProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onCancelBooking?: (bookingId: number, bookingNumber: string) => void; // Updated to include bookingNumber
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onBookingClick, onCancelBooking }) => (
  <div className="content">
    <table className="profile-table">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Visningsdatum</th>
          <th>Visningstid</th>
          <th>Bokningsnummer</th>
          {onCancelBooking && <th>Avboka</th>}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.bookingId} onClick={() => onBookingClick(booking)}>
            <td>{booking.movieTitle}</td>
            <td>{new Date(booking.screeningTime).toLocaleDateString('sv-SE')}</td> {/* Swedish Date Format */}
            <td>{new Date(booking.screeningTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td> {/* Time Display */}
            <td>{booking.bookingNumber}</td>
            {onCancelBooking && (
              <td>
                <button
                  className="cancel-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Pass both bookingId and bookingNumber to onCancelBooking
                    onCancelBooking(booking.bookingId, booking.bookingNumber);
                  }}
                >
                  Avboka
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Updated Pagination component using Bootstrap Pagination
interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void; // Function to set the page
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  setPage,
}) => (
  <div className="custom-pagination">
    <Pagination className="d-flex justify-content-center mt-3">
      <Pagination.Prev
        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, pageNum) => (
        <Pagination.Item 
          key={pageNum} 
          active={currentPage === pageNum + 1}
          onClick={() => setPage(pageNum + 1)}
        >
          {pageNum + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next 
        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  </div>
);

// Booking Modal component
interface BookingModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  const screeningDate = new Date(booking.screeningTime);
  const formattedDate = screeningDate.toLocaleDateString('sv-SE'); // Format date in Swedish
  const formattedTime = screeningDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
  const formattedBookingDate = new Date(booking.bookingDate).toLocaleString('sv-SE'); // Format booking date

  // Check if seats is an array and provide a fallback if not
  const seatsDisplay = Array.isArray(booking.seats) ? booking.seats.join(', ') : 'Inga platser valda';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Bokningsdetaljer</h2>
        <div>
          <p><strong>Film titel:</strong> {booking.movieTitle}</p>
          <p><strong>Visningarsdatum:</strong> {formattedDate}</p>
          <p><strong>Visningarstid:</strong> {formattedTime}</p>
          <p><strong>Platser:</strong> {seatsDisplay}</p>
          <p><strong>Bokningsnummer:</strong> {booking.bookingNumber}</p>
          <p><strong>Bokningsdatum:</strong> {formattedBookingDate}</p>
        </div>
        <button className="close-modal-button" onClick={onClose}>Stäng</button>
      </div>
    </div>
  );
};

export default MinProfil;




























