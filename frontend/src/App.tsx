



import { Outlet } from "react-router-dom";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import WideNavBar from "./components/WideNavBar/WideNavBar";
import "./App.css";



export default function App() {


  return (

  
      <section className="app-section">
    
        <WideNavBar
          
       

        />
        <div className="content-container">
        
          <Outlet />
        </div>

        <MobileNavBar />



   
      </section>
  
  );
}
