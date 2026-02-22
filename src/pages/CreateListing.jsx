import { useState } from "react";
import axios from "axios";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("pricePerNight", pricePerNight);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/create/listing", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT protected
        },
      });

      // reset form
      setTitle("");
      setDescription("");
      setCity("");
      setPricePerNight("");
      setImage(null);
      setError("");

      alert("Listing created successfully!");
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3>Create Listing</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price per night"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          required
        />
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary w-100">
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;

