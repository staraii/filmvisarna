// src/layouts/LayoutWithoutFooter.tsx
import { Outlet } from 'react-router-dom';
import WideNavBar from '../components/WideNavBar/WideNavBar';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar';

const LayoutWithoutFooter: React.FC = () => {
  return (
    <>
      <WideNavBar />
      <div className="content-container">
        <Outlet />  {/* This renders the routed page content */}
      </div>
      <MobileNavBar />
    </>
  );
};

export default LayoutWithoutFooter;

