import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} ResQFood
        </div>

        {/* Center */}
        <div className="flex gap-6 text-sm text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer">See NGOs</span>
          <span href="/our-vision" className="hover:text-gray-900 cursor-pointer">Our Vision</span>
          <a href="/contact-us" className="hover:text-gray-900 cursor-pointer">Contact Us</a>
        </div>

        {/* Right */}
        <div className="text-sm text-gray-500">
          Built with ❤️ for reducing food waste
        </div>
      </div>
    </footer>
  );
}