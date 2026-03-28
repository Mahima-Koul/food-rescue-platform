// src/pages/OurVision.jsx
import Navbar from "../components/Navbar";
export default function OurVision() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EDE7E1]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Vision</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            At <span className="font-semibold text-[#5C4A3D]">ResQmeal</span>, we aim to reduce food wastage
            by connecting restaurants with NGOs in need. Our mission is to ensure that
            excess food reaches those who need it most — efficiently, safely, and sustainably.
          </p>
        </section>

        {/* Why It Matters Section */}
        <section className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Combat Food Waste</h2>
            <p className="text-gray-600">
              Millions of meals are wasted every day. Our platform empowers restaurants to donate surplus food,
              minimizing waste and its environmental impact.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Feed the Needy</h2>
            <p className="text-gray-600">
              NGOs and charities gain access to fresh, quality food to serve communities in need,
              improving lives and promoting social responsibility.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#ccbeb1] p-10 rounded-xl shadow-inner mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <ul className="space-y-6 max-w-3xl mx-auto text-gray-700">
            <li>1️⃣ Restaurants post listings of surplus food quickly and easily.</li>
            <li>2️⃣ NGOs browse real-time listings and claim food they need.</li>
            <li>3️⃣ The food is picked up or delivered safely to the organization.</li>
            <li>4️⃣ Impact is tracked: meals donated, food rescued, and communities served.</li>
          </ul>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Us in Reducing Food Waste</h2>
          <p className="text-gray-600 mb-6">Whether you're a restaurant or an NGO, your participation makes a difference.</p>
          <button 
          onClick={() => window.location.href = "/"}
          className="bg-[#635C4A] hover:bg-[#5C4A3D] text-white px-6 py-3 rounded-xl font-semibold transition">
            Get Started
          </button>
        </section>
      </main>

      
    </div>
  );
}
