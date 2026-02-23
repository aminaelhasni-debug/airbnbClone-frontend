import { useState } from "react";
import { bookingsAPI, getImageUrl, getErrorMessage } from "../service/api";
import { useNavigate } from "react-router-dom";

  const ListingCard = ({ listing }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

if (!listing) return null;

  const handleBookClick = () => {
    if (!token) {
      navigate("/login");
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
      await bookingsAPI.createBooking({
        listingId: listing._id,
        startDate,
        endDate,
      });
      alert("Booking created successfully!");
      setShowBookingForm(false);
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err) || "Booking failed");
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={getImageUrl(listing.image)}
        className="card-img-top"
        alt={listing.title || "Listing"}
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







