import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState } from "react"; // keep this

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Bookings from "./pages/Bookings";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { getToken, removeToken, isLoggedIn } from "./service/auth"; // keep only one


function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  const handleLogin = () => setLoggedIn(true);

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<Navigate to="/login" />} />          
        {/* Public routes */}
        {!loggedIn && (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/" element={<Home />} />
          </>
        )}

        {/* Protected routes */}
        {loggedIn && (
          <>
            <Route path="/create" element={<CreateListing />} />
            <Route path="/my-listings" element={<MyListings />} />
          </>
        )}
      </Routes>

      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
