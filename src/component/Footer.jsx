import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
        <footer className="bg-white border-top mt-5">
      <div className="container py-4">
        <div className="row text-center text-md-start align-items-center">

          {/* Brand */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">TranquilStays</h5>
            <p className="text-muted small mb-0">
              Find & book beautiful places with ease.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3 mb-md-0">
      <ul className="list-unstyled d-flex justify-content-center gap-4 mb-0">
        <li>
          <Link to="/" className="text-muted text-decoration-none">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" className="text-muted text-decoration-none">
            Create
          </Link>
        </li>
        <li>
          <Link to="/my-listings" className="text-muted text-decoration-none">
            My Listings
          </Link>
        </li>
      </ul>
    </div>

          {/* Copyright */}
          <div className="col-md-4 text-md-end">
            <span className="text-muted small">
              © {new Date().getFullYear()} TranquilStays. All rights reserved.
            </span>
          </div>

        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer