import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";
import { checkSession } from "./services/authService";  // Assuming authService.ts contains checkSession
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);  // Store user data if logged in

  useEffect(() => {
    // Check session on mount
    const fetchSession = async () => {
      try {
        const data = await checkSession();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user); // Store user data if authenticated
        } else {
          setIsAuthenticated(false);
          setUser(null);  // Clear user data if not authenticated
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchSession();
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="app-section">
      <WideNavBar isAuthenticated={isAuthenticated} user={user} />
      <div className="content-container">
        <Outlet />
      </div>
      <MobileNavBar isAuthenticated={isAuthenticated} user={user} />
    </section>
  );
}

