import { useState } from "react";
import axios from "axios";
import { getImageUrl } from "../utils/getImageUrl";

const ListingCard = ({ listing }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");

  if (!listing) return null; // Safe check

  const handleBookClick = () => {
    if (!token) {
      window.location.href = "/login"; // redirect to login
      return;
    }
    setShowBookingForm(true);
  };

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/create/booking",
        {
          listingId: listing._id,
          startDate,
          endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Booking created successfully!");
      setShowBookingForm(false);
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
  src={getImageUrl(listing.image)}
  alt={listing.title || "Listing"}
  className="card-img-top"
  style={{ height: "200px", objectFit: "cover" }}
/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{listing.title || "No title"}</h5>
        <p className="text-muted mb-1">{listing.city || "No city"}</p>
        <p className="fw-bold">${listing.pricePerNight || 0} / night</p>
        <p className="small text-muted">{listing.description || "No description"}</p>

        {!showBookingForm ? (
          <button className="btn btn-primary mt-auto" onClick={handleBookClick}>
            Book Now
          </button>
        ) : (
          <div className="mt-3">
            <input
              type="date"
              className="form-control mb-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="btn btn-success w-100" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;







