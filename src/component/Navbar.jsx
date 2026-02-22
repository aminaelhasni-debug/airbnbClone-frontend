import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">TranquilStays</Link>

        <div className="ms-auto d-flex gap-3">
          <Link to="/bookings" className="btn btn-info text-white">Booking</Link>
          {!loggedIn && (
            <>
              <Link to="/login" className="btn btn-outline-primary">Login</Link>
              <Link to="/register" className="btn btn-outline-secondary">Register</Link>
              
            </>
          )}

          {loggedIn && (
            <>
              <Link to="/create" className="btn btn-primary">Create Listing</Link>
              <Link to="/my-listings" className="btn btn-info text-white">My Listings</Link>
              <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

