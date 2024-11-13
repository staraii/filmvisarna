import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar"; // Just use WideNavBar directly
import { checkSession } from "./services/authService"; // Assuming authService.ts contains checkSession


import 'react-toastify/dist/ReactToastify.css';  // Import Toastify's CSS

import "./App.css";

export default function App() {
 
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await checkSession();
        if (data.isAuthenticated) {
          // Set authentication state if you want to manage the session here too
        } else {
          // Handle session expiration here if necessary
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    fetchSession();
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="app-section">
      <WideNavBar />
      <div className="content-container">
        <Outlet />
      </div>
      <MobileNavBar />
      
    </section>
  );
}


