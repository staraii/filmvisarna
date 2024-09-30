import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";
import MoveDetailsPage from "./pages/MoveDetailsPage";
import BookingPage from "./pages/BookingPage";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";
import LoginPage from "./components/Login-pop-up/LoginMobile";
import Footer from "./components/Footer/Footer";
import BookingConfirmationPage from "./pages/BookingConfirmation";
import "./App.css";

export default function App() {
  return (
    <section className="app-section">
      <Router>
        <WideNavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/film" element={<MoveDetailsPage />} />
            <Route path="/boka" element={<BookingPage />} />
            <Route path="/loggain" element={<LoginPage />} />
            <Route
              path="/order-bekraftelse"
              element={<BookingConfirmationPage />}
            ></Route>
          </Routes>
        </div>
        <MobileNavBar />
        <Footer />
      </Router>
    </section>
  );
}
