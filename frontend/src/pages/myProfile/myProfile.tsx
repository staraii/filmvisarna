import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../utils/authContext";
import { fetchUserBookings } from "../../utils/queryService";
import Pagination from 'react-bootstrap/Pagination'; // Import Bootstrap pagination
import "./myProfile.css";
import { cancelBooking } from "../../services/authService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QrModal from "../../components/QrModal/QrModal";



// Define types for bookings and modal props
interface CancelConfirmationModalProps {
  onConfirm: () => void;
  onClose: () => void;
  bookingNumber: string;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({ onConfirm, onClose, bookingNumber }) => (
  <Modal show onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Bekräfta Avbokning</Modal.Title>
    </Modal.Header>
    <Modal.Body>Är du säker på att du vill avboka bokningsnummer {bookingNumber}?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Avbryt</Button>
      <Button variant="primary" onClick={onConfirm}>Ja, Avboka</Button>
    </Modal.Footer>
  </Modal>
);

interface Booking {
  bookingId: number;
  bookingNumber: string;
  screeningId: number;
  screeningTime: string;
  movieTitle: string;
  seats: string;
  bookingDate: string;
  ticketTypes: string;
  totalPrice: string;
}

const MinProfil = () => {
  const { userEmail, firstName, fetchUserData } = useAuth();
  
  const { data: bookings, refetch } = useQuery({
    queryKey: ["userBookings", userEmail],
    queryFn: () => fetchUserBookings(userEmail!),
    enabled: !!userEmail,
    retry: 1,
  });

  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<{ id: number; number: string } | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [bookingNumberForQr, setBookingNumberForQr] = useState<string | null>(null);
  
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [pastBookingPage, setPastBookingPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

   // Split bookings into current and past
  useEffect(() => {
    if (bookings) {
      const now = new Date();
      setCurrentBookings(bookings.filter((b: Booking) => new Date(b.screeningTime) >= now));
      setPastBookings(bookings.filter((b: Booking) => new Date(b.screeningTime) < now));
    }
  }, [bookings]);

  // Adjust pagination if no bookings exist on the current page
  useEffect(() => {
    if (currentBookings.length <= (currentBookingPage - 1) * itemsPerPage && currentBookingPage > 1) {
      setCurrentBookingPage(currentBookingPage - 1);
    }

    if (pastBookings.length <= (pastBookingPage - 1) * itemsPerPage && pastBookingPage > 1) {
      setPastBookingPage(pastBookingPage - 1);
    }
  }, [currentBookings, pastBookings, currentBookingPage, pastBookingPage]);

  const openCancelModal = (bookingId: number, bookingNumber: string) => {
    setBookingToCancel({ id: bookingId, number: bookingNumber });
    setShowConfirmationModal(true);
  };

  const confirmCancelBooking = async () => {
    if (!bookingToCancel || !userEmail) return;
    try {
      await cancelBooking(bookingToCancel.id, userEmail, bookingToCancel.number);
      refetch();
    } catch (error) {
      console.error("Error while canceling:", error);
    } finally {
      setShowConfirmationModal(false);
      setBookingToCancel(null);
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const paginate = (bookings: Booking[], page: number) => {
    const indexOfLast = page * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return bookings.slice(indexOfFirst, indexOfLast);
  };

  // Function to open QR modal
  const openQrModal = (bookingNumber: string) => {
    setBookingNumberForQr(bookingNumber);
    setShowQrModal(true);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setBookingNumberForQr(null);
  };

  return (
    <div className="profile-container">
      <p>
        Välkommen,{" "}
        {firstName
          ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
          : userEmail}
      </p>
      <hr />

      {showConfirmationModal && bookingToCancel && (
        <CancelConfirmationModal
          bookingNumber={bookingToCancel.number}
          onConfirm={confirmCancelBooking}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
      <div className="profile-section">
        <h2>Aktuella Bokningar</h2>
        {currentBookings.length === 0 ? (
          <p>Du har inga aktuella bokningar.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(currentBookings, currentBookingPage)}
              onBookingClick={handleBookingClick}
                openCancelModal={openCancelModal}
                openQrModal={openQrModal} // Pass QR modal open function
            />
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

      <div className="profile-section">
        <h2>Bokningshistorik</h2>
        {pastBookings.length === 0 ? (
          <p>Du har inga tidigare bokningar.</p>
        ) : (
          <>
            <BookingTable
              bookings={paginate(pastBookings, pastBookingPage)}
                onBookingClick={handleBookingClick}
                 openQrModal={openQrModal} //
            />
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

      {showModal && selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={handleCloseModal} />
      )}

     {/* QR Modal to show the QR code */}
      {bookingNumberForQr && (
        <QrModal
          show={showQrModal}
          hide={closeQrModal}
          bookingNumber={bookingNumberForQr}
        />
      )}
    </div>
  );
};

interface BookingTableProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  openCancelModal?: (bookingId: number, bookingNumber: string) => void;
   openQrModal?: (bookingNumber: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onBookingClick, openCancelModal,openQrModal  }) => (
  <div className="content">
    <table className="profile-table">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Visningsdatum</th>
          <th>Visningstid</th>
          <th>Bokningsnummer</th>
          {openCancelModal && <th>Avboka</th>}
             {openQrModal && <th>QR Kod</th>}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.bookingId} onClick={() => onBookingClick(booking)}>
            <td>{booking.movieTitle}</td>
            <td>{new Date(booking.screeningTime).toLocaleDateString('sv-SE')}</td>
            <td>{new Date(booking.screeningTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{booking.bookingNumber}</td>
            {openCancelModal && (
              <td>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCancelModal(booking.bookingId, booking.bookingNumber);
                  }}
                >
                  Avboka
                </Button>
              </td>
            )}
           {openQrModal && (
              <td>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    openQrModal(booking.bookingNumber); // Open the QR modal
                  }}
                >
                  Visa QR Kod
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ totalPages, currentPage, setPage }) => (
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

// translate ticket type to swedish
const ticketTypeTranslations: { [key: string]: string } = {
  Adult: "Vuxen",
  Child: "Barn",
  Senior: "Senior",
  Student: "Student",
};

// Utility function to parse and format ticket types
const formatTicketTypes = (ticketTypes: string): string => {
  const typeCounts: { [type: string]: number } = {};

  ticketTypes.split(",").forEach((type) => {
    const trimmedType = type.trim();
    if (typeCounts[trimmedType]) {
      typeCounts[trimmedType]++;
    } else {
      typeCounts[trimmedType] = 1;
    }
  });

  return Object.entries(typeCounts)
    .map(([type, count]) => `${count} ${ticketTypeTranslations[type] || type}`)
    .join(", ");
};


// Booking Modal component
interface BookingModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  const screeningDate = new Date(booking.screeningTime);
  const formattedDate = screeningDate.toLocaleDateString('sv-SE'); // Format date in Swedish
  const formattedTime = screeningDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
 
   // Filtering out seconds in booking date 
  const formatBookingDate = (bookingDate: string): string => {
    const dateTime = new Date(bookingDate);
    const formattedDate = dateTime.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };
  
  const formattedBookingDate = formatBookingDate(booking.bookingDate); // Apply custom formatting

  // Check if seats is an array and provide a fallback if not
  const seatsDisplay = typeof booking.seats === 'string' 
    ? booking.seats.split(',').map(seat => seat.trim()).join(', ') 
    : 'Inga platser valda';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Bokningsdetaljer</h2>
        <div>
          <p><strong></strong> {booking.movieTitle}</p>
          <p><strong>Visningstid:</strong> {formattedDate} {formattedTime}</p>
          <p><strong>Platser:</strong> {seatsDisplay}</p>
          <p><strong>Bokningsnummer:</strong> {booking.bookingNumber}</p>
          <p><strong>Bokningsdatum:</strong> {formattedBookingDate}</p>
           <p><strong>Biljett:</strong> {formatTicketTypes(booking.ticketTypes)}</p>
          <p><strong>Totalt pris:</strong> {booking.totalPrice}</p>
        </div>
        <Button variant="primary" onClick={onClose}>Stäng</Button>
      </div>
    </div>
  );
};

export default MinProfil;




























