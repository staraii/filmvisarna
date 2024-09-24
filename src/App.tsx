import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import MoveDetailsPage from "./pages/MoveDetailsPage";
import BookingPage from "./pages/BookingPage";
import MobileNavBar from './components/MobileNavBar/MobileNavBar';




export default function App(){
        return (
     <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/film" element={<MoveDetailsPage />} />
          <Route path="/boka" element={<BookingPage />} />
        </Routes>
      </Router>
      <MobileNavBar />
    </>
  );
}


