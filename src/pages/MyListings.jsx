import { useEffect, useState } from "react";
import { listingsAPI, getErrorMessage } from "../service/api";
import { getImageUrl } from "../utils/getImageUrl";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getMyListings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listingsAPI.getMyListings();
      setListings(res.data);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const getListingById = async (id) => {
    try {
      const res = await listingsAPI.getListingById(id);
      setSelectedListing(res.data);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  if (loading)
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading your listings...</p>
      </div>
    );

  return (
    <div className="container my-5">
      <h3>My Listings</h3>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError("")} />
        </div>
      )}

      <div className="row g-4">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div className="col-md-4" key={listing._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={getImageUrl(listing.image)}
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
          ))
        ) : (
          <p className="text-center text-muted w-100">No listings yet. Create one!</p>
        )}
      </div>

      {selectedListing && (
        <div className="mt-5 p-4 border rounded">
          <h4>{selectedListing.title}</h4>
          <img
            src={getImageUrl(selectedListing.image)}
            className="img-fluid mb-3"
            alt={selectedListing.title}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <p>
            <strong>City:</strong> {selectedListing.city}
          </p>
          <p>
            <strong>Price:</strong> ${selectedListing.pricePerNight}
          </p>
          <p>{selectedListing.description}</p>
          <button
            onClick={() => setSelectedListing(null)}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyListings;
