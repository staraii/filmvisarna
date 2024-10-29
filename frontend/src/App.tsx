import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
// import Register from "./pages/Register/Register";
// import MoveDetailsPage from "./pages/MoveDetailsPage";
// import BookingPage from "./pages/BookingPage";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";

// import BookingConfirmationPage from "./pages/BookingConfirmation";
// import MovieCalendar from "./components/MovieCalendar/MovieCalendar";
// import CancelTickets from "./pages/Cancel-Tickets/Cancel-Tickets";
// import Movies from "./pages/Movies/Movies";

// import LoginPage from "./components/Login-pop-up/LoginMobile";
// import CancelTicketsLogin from "./pages/Cancel-Tickets-Login/CancelTicketsLogin";



import BookingConfirmationPage from "./pages/BookingConfirmation";
import MovieCalendar from "./components/MovieCalendar/MovieCalendar";
import Movies from "./pages/Movies/Movies";
import LoginModal from "./components/Login-pop-up/LoginModal"; // Ensure correct import
import LoginPage from "./components/Login-pop-up/LoginMobile";

import "./App.css";
//import PasswordReset from "./components/Login-pop-up/passwordReset";



// Import the AuthProvider
import { AuthProvider } from "./utils/authContext"; // Adjust the path as necessary
import CancelTicketsContainer from "./utils/CancelTicketsContainer";
import MinProfil from "./pages/myProfile/myProfile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false); // State for showing the login modal

  const handleLoginShow = () => setShowLoginModal(true); // Show login modal
  const handleLoginClose = () => setShowLoginModal(false); // Hide login modal

  return (

     <AuthProvider>
    <section className="app-section">
      {/* <Router> */}
        <WideNavBar
        
          onLoginShow={handleLoginShow} // Show modal instead of direct login
          
        />
        <div className="content-container">
          {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route path="/film" element={<MovieDetailsPage />} />
            <Route path="/filmer" element={<Movies />} />
            <Route path="/boka" element={<BookingPage />} />

            <Route
              path="/order-bekraftelse"
              element={<BookingConfirmationPage />}
            />
              <Route path="/bio-kalender" element={<MovieCalendar />} />
                  {/* Protect the profile route */}
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <MinProfil />
            </ProtectedRoute>
          }
        />
              
            <Route path="/avboka" element={<CancelTicketsContainer />} />
            <Route path="/loggain" element={<LoginPage />} />
            <Route path="/forgot-password" element={<PasswordReset />} />
          </Routes> */}
          <Outlet />
        </div>
        <MobileNavBar />

        {/* Render LoginModal outside of the Routes to ensure a single instance */}
        <LoginModal
          show={showLoginModal}
          handleClose={handleLoginClose}
          
        />
      {/* </Router> */}
    </section>
</AuthProvider>

  );
}

