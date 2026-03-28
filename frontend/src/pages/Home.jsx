import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg-image.jpg";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      {/* Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,15,10,0.75), rgba(20,15,10,0.75)),
            url(${bg})
          `,
        }}
      >
        <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg tracking-tight">
          Save Food. <span className="text-[#ffd6a5]">Serve People.</span>
        </h2>

        <p className="text-[#f3f3f3] mb-10 text-lg max-w-2xl drop-shadow">
          Connecting restaurants with NGOs to reduce food waste and fight hunger in real time.
        </p>

        <Link
          to="/signup"
          className="bg-[#8b6f5a] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[#6f5646] transition shadow-xl backdrop-blur-sm"
        >
          Get Started 
        </Link>
      </div>

      {/* How it Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 max-w-6xl mx-auto">
        
        <div className="bg-[#f5efe6] p-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="text-3xl mb-3">🍽️</div>
          <h3 className="font-bold text-xl mb-2 font-[Georgia] text-[#3e2f25]">Post Food</h3>
          <p className="text-gray-600">
            Restaurants list surplus food in seconds
          </p>
        </div>

        <div className="bg-[#f5efe6] p-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-bold text-xl mb-2 font-[Georgia] text-[#3e2f25]">NGO Accepts</h3>
          <p className="text-gray-600">
            Nearby NGOs get notified instantly
          </p>
        </div>

        <div className="bg-[#f5efe6] p-8 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="font-bold text-xl mb-2 font-[Georgia] text-[#3e2f25]">Deliver</h3>
          <p className="text-gray-600">
            Food reaches those in need quickly
          </p>
        </div>

      </div>

      {/* Impact Section */}
      <div className="text-center py-14 bg-white border-t">
        <h2 className="font-bold text-xl mb-2 font-[Georgia] text-[#3e2f25]">Our Impact</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-10 text-lg">
          
          <div className="bg-[#f0e7dc] px-8 py-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            🍽️ <span className="font-[Georgia] text-[#3e2f25] font-">1200+ meals saved</span>
          </div>

          <div className="bg-[#f0e7dc] px-8 py-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            🌍 <span className=" font-[Georgia] text-[#3e2f25] font-">Reducing food waste daily</span>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Home;