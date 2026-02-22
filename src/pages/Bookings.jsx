// src/pages/Bookings.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/my/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [token]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
    await axios.delete(
  `http://localhost:5000/booking/${id}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
      // Remove deleted booking from state
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. Check backend route.");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Bookings on My Listings</h3>

      {bookings.length === 0 && <p className="text-muted">No bookings yet.</p>}

      <div className="row g-4">
        {bookings.map((booking) => (
          <div className="col-md-4" key={booking._id}>
            <div className="card h-100 shadow-sm p-3">
              {/* User Info */}
              <p className="mb-1">
                👤 <strong>{booking.user?.name}</strong>
              </p>
              <p className="text-muted small">
                📧 {booking.user?.email}
              </p>

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
    </div>
  );
};

export default Bookings;
