import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar"; 
import { checkSession } from "./services/authService"; 



import "./App.css";

 
export default function App() {
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await checkSession();

        if (data && data.isAuthenticated) {
          // Handle authenticated state
          
        } else {
          // Handle session expiration or user not authenticated
          
        }
      } catch (error) {
        // Log the error if fetching session fails
        console.error("Error checking session:", error);
      }
    };

    fetchSession();
  }, []); 

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


