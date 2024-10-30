import { useState } from "react";

import { Outlet } from "react-router-dom";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";

import LoginModal from "./components/Login-pop-up/LoginModal"; // Ensure correct import


import "./App.css";
//import PasswordReset from "./components/Login-pop-up/passwordReset";



// Import the AuthProvider
import { AuthProvider } from "./utils/authContext"; // Adjust the path as necessary



export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false); // State for showing the login modal

  const handleLoginShow = () => setShowLoginModal(true); // Show login modal
  const handleLoginClose = () => setShowLoginModal(false); // Hide login modal

  return (

    <AuthProvider>
      <section className="app-section">
        <WideNavBar
          onLoginShow={handleLoginShow} // Show modal instead of direct login
        />
        <div className="content-container">
          <Outlet />
        </div>
        <MobileNavBar />
        <LoginModal
          show={showLoginModal}
          handleClose={handleLoginClose}  
        />
    </section>
</AuthProvider>

  );
}

