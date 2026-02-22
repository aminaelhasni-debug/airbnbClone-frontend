import { useEffect, useState } from "react";
import ListingCard from "../component/ListingCard";
import { listingsAPI, getErrorMessage } from "../service/api";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch listings
  const fetchListings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listingsAPI.getAllListings();
      setListings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError(getErrorMessage(err));
      setListings([]);
    } finally {
      setLoading(false);
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

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading listings...</p>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Home;
