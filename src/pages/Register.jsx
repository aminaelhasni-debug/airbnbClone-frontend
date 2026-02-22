import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ onLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Frontend validation
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z ]{2,30}$/; // letters and spaces, 2-30 chars
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // min 6 chars, letters + numbers

    if (!nameRegex.test(form.name)) return "Name must be 2-30 letters only";
    if (!emailRegex.test(form.email)) return "Invalid email address";
    if (!passwordRegex.test(form.password))
      return "Password must be at least 6 characters and contain letters and numbers";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", form);
      alert("Registered successfully!");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Register</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={submit}>
        <input
          className="form-control mb-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
