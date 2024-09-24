import "./footer.css"; // Include any custom styles you want

export default function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-separator" /> {/* Line above the footer */}
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Filmvisarna</h5>
            <p>
              Your go-to platform for the latest movies, showtimes, and updates.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@filmvisarna.com</li>
              <li>Phone: +46 123 456 789</li>
              <li>Address: 123 Movie Street, Stockholm, Sweden</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
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
        <hr className="footer-separator" /> {/* Line separating footer content from copyright */}
        <div className="text-center py-3">
          <p>&copy; {new Date().getFullYear()} Filmvisarna. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

