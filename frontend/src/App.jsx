import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NGODashboard from "./pages/NGODashboard";
import Home from "./pages/Home";
import AddDonation from "./pages/AddDonation";
import ContactUs from "./pages/ContactUs";
import OurVision from "./pages/OurVision";
import NgoMap from "./pages/NgoMap";
import NGOProfile from "./pages/NGOProfile";
import RestaurantProfile from "./pages/RestaurantProfile";


function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/ngo-map" element={<NgoMap />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/our-vision" element={<OurVision />} />
        <Route path="/ngo-profile" element={<NGOProfile />} />
        <Route path="/restaurant-profile" element={<RestaurantProfile />} />
        
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