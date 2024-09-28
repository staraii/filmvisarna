// src/layouts/LayoutWithFooter.tsx
import { Outlet } from 'react-router-dom';
import WideNavBar from '../components/WideNavBar/WideNavBar';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar';
import Footer from '../components/Footer/Footer';

const LayoutWithFooter: React.FC = () => {
  return (
    <>
      <WideNavBar />
      <div className="content-container">
        <Outlet />  {/* This renders the routed page content */}
      </div>
      <MobileNavBar />
      <Footer />  {/* Footer will be visible here */}
    </>
  );
};

export default LayoutWithFooter;

