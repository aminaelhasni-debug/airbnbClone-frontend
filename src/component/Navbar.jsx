import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogoutClick = () => {
    onLogout();
    closeMobileMenu();
  };

  const NavLinks = ({ onItemClick }) => (
    <>
      <Link to="/bookings" className="btn btn-info text-white" onClick={onItemClick}>
        Booking
      </Link>
      {!loggedIn && (
        <>
          <Link to="/login" className="btn btn-outline-primary" onClick={onItemClick}>
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-secondary" onClick={onItemClick}>
            Register
          </Link>
        </>
      )}
      {loggedIn && (
        <>
          <Link to="/create" className="btn btn-primary" onClick={onItemClick}>
            Create Listing
          </Link>
          <Link to="/my-listings" className="btn btn-info text-white" onClick={onItemClick}>
            My Listings
          </Link>
          <button onClick={handleLogoutClick} className="btn btn-outline-danger">
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">TranquilStays</Link>

        <button
          type="button"
          className="navbar-burger btn btn-outline-secondary"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-burger-line"></span>
          <span className="navbar-burger-line"></span>
          <span className="navbar-burger-line"></span>
        </button>

        <div className="ms-auto gap-3 navbar-links-desktop">
          <NavLinks />
        </div>
      </div>

      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="container d-flex flex-column gap-2 py-2">
          <NavLinks onItemClick={closeMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

