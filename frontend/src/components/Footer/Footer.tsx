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
            <ul className="list-unstyled d-flex flex-column social-icons">
              {/* Facebook Icon */}
              <li className="mb-2 d-flex align-items-center"> {/* Added flex class for alignment */}
                <a href="#" className="text-light" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#efecf8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" />
                  </svg>
                </a>
                <span className="ms-2 text-light">@filmvisarna</span> {/* Added text after icon */}
              </li>

              {/* Twitter Icon */}
              <li className="mb-2 d-flex align-items-center"> {/* Added flex class for alignment */}
                <a href="#" className="text-light" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#efecf8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.643 4.937a9.58 9.58 0 0 1-2.743.75 4.923 4.923 0 0 0 2.165-2.724 9.873 9.873 0 0 1-3.127 1.197 4.92 4.92 0 0 0-8.384 4.482A13.977 13.977 0 0 1 1.67 3.149 4.922 4.922 0 0 0 3.175 9.222a4.88 4.88 0 0 1-2.223-.615v.061a4.923 4.923 0 0 0 3.946 4.83 4.919 4.919 0 0 1-2.213.083 4.923 4.923 0 0 0 4.58 3.407A9.868 9.868 0 0 1 0 19.54a13.923 13.923 0 0 0 7.548 2.211c9.057 0 14.003-7.493 14.003-13.986 0-.21-.005-.42-.014-.63A10.027 10.027 0 0 0 24 4.594a9.882 9.882 0 0 1-2.357.645 4.934 4.934 0 0 0 2.154-2.724z" />
                  </svg>
                </a>
                <span className="ms-2 text-light">@filmvisarna</span> {/* Added text after icon */}
              </li>

              {/* Instagram Icon */}
              <li className="d-flex align-items-center"> {/* Added flex class for alignment */}
                <a href="#" className="text-light" aria-label="Instagram">
                  <svg
                    className="instagram-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <span className="ms-2 text-light">@filmvisarna</span> {/* Added text after icon */}
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


