import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">🍱 Food Rescue</h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-b from-green-50 to-white">
        
        <h2 className="text-5xl font-extrabold mb-6 text-gray-800 leading-tight">
          Rescue Food. <span className="text-green-600">Feed People.</span>
        </h2>

        <p className="text-gray-600 mb-10 text-lg max-w-2xl">
          Connecting restaurants with NGOs to reduce food waste and fight hunger in real time.
        </p>

        <Link
          to="/signup"
          className="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition shadow-lg"
        >
          Get Started 🚀
        </Link>
      </div>

      {/* How it Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-16 max-w-6xl mx-auto">

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <div className="text-3xl mb-3">🍽️</div>
          <h3 className="font-bold text-xl mb-2">Post Food</h3>
          <p className="text-gray-600">
            Restaurants list surplus food in seconds
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-bold text-xl mb-2">NGO Accepts</h3>
          <p className="text-gray-600">
            Nearby NGOs get notified instantly
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="font-bold text-xl mb-2">Deliver</h3>
          <p className="text-gray-600">
            Food reaches those in need quickly
          </p>
        </div>

      </div>

      {/* Impact Section */}
      <div className="text-center py-14 bg-white border-t">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Impact</h3>

        <div className="flex flex-col md:flex-row justify-center gap-10 text-lg">
          <div className="bg-green-50 px-8 py-6 rounded-xl shadow">
            🍽️ <span className="font-bold">1200+ meals saved</span>
          </div>

          <div className="bg-green-50 px-8 py-6 rounded-xl shadow">
            🌍 <span className="font-bold">Reducing food waste daily</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-green-600 text-white text-center p-5">
        <p className="font-semibold">© 2026 Food Rescue Platform</p>
        <p className="text-sm opacity-80">Built for a better future 🌱</p>
      </footer>

    </div>
  );
}

export default Home;