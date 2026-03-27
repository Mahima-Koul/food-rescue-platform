import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">🍱 Food Rescue</h1>
        <div className="space-x-4">
          <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-white text-green-600 px-3 py-1 rounded">
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-16">
        <h2 className="text-4xl font-bold mb-4">
          Rescue Food. Feed People.
        </h2>
        <p className="text-gray-600 mb-6">
          Connecting restaurants with NGOs to reduce food waste
        </p>

        <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded">
          Get Started
        </Link>
      </div>

    </div>
  );
}

export default Home;