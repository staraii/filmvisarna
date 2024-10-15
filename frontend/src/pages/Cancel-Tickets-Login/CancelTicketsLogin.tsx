import "./CancelTicketsLogin.css";

const CancelTicketsLogin = () => {
  return (
    <section className="cancel-ticket-container">
      <div className="header-text">
        <h3>Avboka Biljetter</h3>
      </div>
      <div className="tickets-text">
        <h4>Dina biljetter</h4>
      </div>
      <div className="tickets"></div>
    </section>
  );
};

export default CancelTicketsLogin;
