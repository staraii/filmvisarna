import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";
import MoveDetailsPage from "./pages/MoveDetailsPage";
import BookingPage from "./pages/BookingPage";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";
import BookingConfirmationPage from "./pages/BookingConfirmation";
import MovieCalendar from "./components/MovieCalendar/MovieCalendar";
import CancelTickets from "./pages/Cancel-Tickets/Cancel-Tickets";
import LoginModal from "./components/Login-pop-up/LoginModal"; // Ensure correct import
import LoginPage from "./components/Login-pop-up/LoginMobile";

import "./App.css";
import PasswordReset from "./components/Login-pop-up/passwordReset";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged in status
  const [showLoginModal, setShowLoginModal] = useState(false); // State for showing the login modal

  const onLoginClick = () => {
    setIsLoggedIn(true); // Update state to logged in
    setShowLoginModal(false); // Close the modal when logged in
  };

  const onLogout = () => {
    setIsLoggedIn(false); // Update state to logged out
  };

  const handleLoginShow = () => setShowLoginModal(true); // Show login modal
  const handleLoginClose = () => setShowLoginModal(false); // Hide login modal
  

  return (
    <section className="app-section">
      <Router>
        <WideNavBar
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginShow} // Show modal instead of direct login
          onLogout={onLogout}
        />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/film" element={<MoveDetailsPage />} />
            <Route path="/boka" element={<BookingPage />} />
            <Route
              path="/order-bekraftelse"
              element={<BookingConfirmationPage />}
            />
            <Route path="/bio-kalender" element={<MovieCalendar />} />
            <Route path="/avboka" element={<CancelTickets />} />
            <Route path="/loggain" element={<LoginPage />} />
             <Route path="/passwordreset" element={<PasswordReset />} />
            
          </Routes>
        </div>
        <MobileNavBar />
        
        {/* Render LoginModal outside of the Routes to ensure a single instance */}
        <LoginModal
          show={showLoginModal}
          handleClose={handleLoginClose}
          onLogin={onLoginClick}
        />
      </Router>
    </section>
  );
}
