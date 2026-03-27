import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      
      <Link to="/" className="text-xl font-bold hover:text-green-200 transition">
        ResQmeal
        </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add-donation" className="hover:underline">Add Donation</Link>
        <Link to="/restaurant-dashboard" className="hover:underline">Restaurant Dashboard</Link>
        <Link to="/ngo-dashboard" className="hover:underline">NGO Dashboard</Link>

      </div>

    </nav>
  );
}

export default Navbar;