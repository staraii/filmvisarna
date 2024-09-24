import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Register from './components/Register';
import MobileNavBar from './components/MobileNavBar/MobileNavBar';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <MobileNavBar />
    </>
  );
}

export default App;