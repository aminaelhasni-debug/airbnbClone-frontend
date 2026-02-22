import { useState } from "react";
import { listingsAPI, getErrorMessage } from "../service/api";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !city || !pricePerNight) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("pricePerNight", pricePerNight);
      if (image) formData.append("image", image);

      await listingsAPI.createListing(formData);

      // reset form
      setTitle("");
      setDescription("");
      setCity("");
      setPricePerNight("");
      setImage(null);
      alert("Listing created successfully!");
    } catch (err) {
      console.error("Create error:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3>Create Listing</h3>
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price per night"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;

