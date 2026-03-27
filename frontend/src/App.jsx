import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NGODashboard from "./pages/NGODashboard";
import Home from "./pages/Home";
import AddDonation from "./pages/addDonation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />

        <Route path="/ngo-dashboard" element={<NGODashboard />} />

        <Route path="/add-donation" element={<AddDonation />} />
      </Routes>
    </Router>
  );
}

export default App;