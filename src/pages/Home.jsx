import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../component/ListingCard";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  // Fetch listings
  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/listings"); 
      setListings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Remove booking from state after deletion
  const handleBookingDeleted = (listingId) => {
    setListings((prev) =>
      prev.map((l) =>
        l._id === listingId ? { ...l, booking: null } : l
      )
    );
  };

  return (
    <>
      {/* Hero */}
      <div
        className="hero bg-danger text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "617px" }}
      >
        <h1 className="fw-bold text-white">Find your perfect stay</h1>
        <p className="text-light fs-5">Book amazing places easily</p>
      </div>

      {/* Listings */}
      <div className="container my-5">
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row g-4">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div className="col-md-4" key={listing._id}>
                <ListingCard
                  listing={listing}
                  onBookingDeleted={handleBookingDeleted}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No listings available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
