import { useEffect, useState } from "react";
import axios from "axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all user's listings
  const getMyListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/my/listings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single listing by ID
  const getListingById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/listing/${id}`);
      setSelectedListing(res.data); // store in separate state
    } catch (err) {
      console.error(err);
      alert("Failed to load listing details");
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  if (loading) return <p>Loading your listings...</p>;

  return (
    <div className="container my-5">
      <h3>My Listings</h3>
      <div className="row g-4">
        {listings.map((listing) => (
          <div className="col-md-4" key={listing._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000${listing.image || ""}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt={listing.title}
              />
              <div className="card-body">
                <h5>{listing.title}</h5>
                <p className="text-muted">{listing.city}</p>
                <strong>${listing.pricePerNight} / night</strong>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => getListingById(listing._id)}
                >
                  View Listing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show selected listing details */}
      {selectedListing && (
        <div className="mt-5 p-4 border rounded">
          <h4>{selectedListing.title}</h4>
          <img
            src={`http://localhost:5000${selectedListing.image || ""}`}
            className="img-fluid mb-3"
            alt={selectedListing.title}
          />
          <p><strong>City:</strong> {selectedListing.city}</p>
          <p><strong>Price:</strong> ${selectedListing.pricePerNight}</p>
          <p>{selectedListing.description}</p>
          <button onClick={() => setSelectedListing(null)} className="btn btn-secondary">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyListings;
