import { useEffect, useState } from "react";
import { bookingsAPI, getErrorMessage } from "../service/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await bookingsAPI.getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchBookings();
  }, [isLoggedIn]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await bookingsAPI.deleteBooking(id);
      // Remove deleted booking from state
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      setError(getErrorMessage(err));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center py-5">
        <p className="text-muted">Please log in to view your bookings.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Bookings on My Listings</h3>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          />
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-muted">No bookings yet.</p>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div className="col-md-4" key={booking._id}>
              <div className="card h-100 shadow-sm p-3">
                {/* User Info */}
                <p className="mb-1">
                  👤 <strong>{booking.user?.name}</strong>
                </p>
                <p className="text-muted small">📧 {booking.user?.email}</p>

                {/* Listing Info */}
                <p className="mb-1">
                  Listing: <strong>{booking.listing?.title}</strong>
                </p>
                <p className="mb-1">
                  <strong>From:</strong>{" "}
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>To:</strong>{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>

                <button
                  className="btn btn-outline-danger btn-sm w-100 mt-2"
                  onClick={() => deleteBooking(booking._id)}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
