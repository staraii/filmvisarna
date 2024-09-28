import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import MoveDetailsPage from "./pages/MoveDetailsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from './components/Login-pop-up/LoginMobile';
import LayoutWithFooter from './layouts/LayoutWithFooter';
import LayoutWithoutFooter from './layouts/LayoutWithoutFooter';




export default function App() {
  return (
    <section className="app-section">
      <Router>
        <Routes>
          {/* Routes that include the footer */}
          <Route element={<LayoutWithFooter />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/film" element={<MoveDetailsPage />} />
            <Route path="/boka" element={<BookingPage />} />
          </Route>

          {/* Routes that do not include the footer */}
          <Route element={<LayoutWithoutFooter />}>
            <Route path="/register" element={<Register />} />
            <Route path="/loggain" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </section>
  );
}



