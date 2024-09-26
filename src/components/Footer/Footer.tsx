import "./footer.css"; // Include any custom styles you want

export default function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-separator" /> {/* Linje ovanför foten */}
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Om Filmvisarna</h5>
            <p>
              Din plattform för de senaste filmerna, visningstider och uppdateringar.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Kontakta oss</h5>
            <ul className="list-unstyled">
              <li>E-post: info@filmvisarna.com</li>
              <li>Telefon: +46 123 456 789</li>
              <li>Adress: 123 Movie Street, Stockholm, Sverige</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Följ oss</h5>
            <ul className="list-unstyled d-flex">
              <li className="mr-3">
                <a href="#" className="text-light">Facebook</a>
              </li>
              <li className="mr-3">
                <a href="#" className="text-light">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-light">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-separator" /> {/* Linje som skiljer innehållet från copyright */}
        <div className="text-center py-3">
          <p>&copy; {new Date().getFullYear()} Filmvisarna. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}


