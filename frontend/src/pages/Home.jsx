import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
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

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
  
  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    Rescue Food. Feed People.
  </h2>

  <p className="text-gray-600 mb-8 text-lg max-w-xl">
    Connecting restaurants with NGOs to reduce food waste and fight hunger
  </p>

  <Link
    to="/signup"
    className="bg-green-600 text-white px-8 py-3 rounded text-lg hover:bg-green-700"
  >
    Get Started
  </Link>

</div>

      {/* How it Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12 text-center">
        
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold text-lg mb-2">Post Food</h3>
          <p className="text-gray-600">
            Restaurants list surplus food easily
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold text-lg mb-2">NGO Accepts</h3>
          <p className="text-gray-600">
            Nearby NGOs get notified instantly
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold text-lg mb-2">Deliver</h3>
          <p className="text-gray-600">
            Food reaches those in need quickly
          </p>
        </div>

      </div>

      {/* Impact Section */}
      <div className="text-center py-10 bg-white">
        <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
        <p className="text-gray-600 text-lg">🍽️ 1200+ meals saved</p>
        <p className="text-gray-600 text-lg">🌍 Reducing food waste daily</p>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-green-600 text-white text-center p-4">
        <p>© 2026 Food Rescue Platform</p>
        <p className="text-sm">Built for a better future 🌱</p>
      </footer>

    </div>
  );
}

export default Home;

