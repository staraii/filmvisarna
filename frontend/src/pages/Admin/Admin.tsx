import { Outlet, NavLink } from "react-router-dom"


export default function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-navbar">
        <NavLink to="filmer" style={{ color: "#ffffff" }}>
          Filmer
        </NavLink>
        <NavLink to="biljetter" style={{ color: "#ffffff" }}>
          Biljetter
        </NavLink>
      </div>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}