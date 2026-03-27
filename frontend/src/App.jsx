import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NGODashboard from "./pages/NGODashboard";
import Home from "./pages/Home";
import AddDonation from "./pages/AddDonation";
import Navbar from "./components/Navbar";

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/add-donation" element={<AddDonation />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;