import React from "react";
import "./myProfile.css";

const MinProfil = () => {
  // Temporary data to simulate fetched data
  const currentBookings = [
    { movieName: "Inception", date: "2024-11-01", price: "120 kr" },
    { movieName: "Titanic", date: "2024-11-03", price: "110 kr" },
    { movieName: "The Matrix", date: "2024-11-05", price: "130 kr" },
  ];

  const pastBookings = [
    { movieName: "Avatar", date: "2023-12-20", price: "100 kr" },
    { movieName: "The Godfather", date: "2023-12-22", price: "90 kr" },
  ];

  return (
    <div className="profile-container">
      {/* Current Bookings Section */}
      <div className="profile-section">
        <h2>Bokningar</h2>
        <table className="profile-table">
          <thead>
            <tr>
              <th>Filmtitel</th>
              <th>Datum</th>
              <th>Pris</th>
              <th>Åtgärd</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.movieName}</td>
                <td>{booking.date}</td>
                <td>{booking.price}</td>
                <td>
                  <button className="cancel-button">Avboka</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Past Bookings Section */}
      <div className="profile-section">
        <h2>Boknings Historik</h2>
        <table className="profile-table">
          <thead>
            <tr>
              <th>Filmtitel</th>
              <th>Datum</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            {pastBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.movieName}</td>
                <td>{booking.date}</td>
                <td>{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Email Change Section */}
      <div className="profile-section">
        <h2>Ändra e-postadress</h2>
        <p>
          Att ändra e-postadress kräver att du verifierar din e-post innan den nya
          adressen börjar gälla.
        </p>
        <form className="profile-form">
          {/* Inputs removed as requested */}
        </form>
      </div>
    </div>
  );
};

export default MinProfil;



