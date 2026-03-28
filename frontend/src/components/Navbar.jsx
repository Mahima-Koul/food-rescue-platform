import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#ccbeb1] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/image.png" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-semibold text-[#2a221c] font-[Adler]">
            ResQmeal
          </span>
        </Link>

        {/* Right Side */}
        <div className="relative">

          {!user ? (
            // 🔐 NOT LOGGED IN
            <Link
              to="/login"
              className="bg-[#664930] hover:bg-[#4a3520] text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Login / Signup
            </Link>
          ) : (
            // 👤 LOGGED IN
            <div ref={dropdownRef} className="relative">

              {/* Avatar Button */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-[#664930] text-white flex items-center justify-center font-bold hover:bg-[#4a3424] hover:scale-105 transition duration-200 shadow cursor-pointer"
              >
                {user.email?.[0].toUpperCase()}
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 transform transition-all duration-200 ${
                  open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <p className="px-4 py-2 text-xs text-gray-400">
                  {user.email}
                </p>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Account
                </Link>

                <Link
                  to="/add-donation"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Add Listing
                </Link>

                <Link
                  to="/restaurant-dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Restaurant Dashboard
                </Link>

                <Link
                  to="/ngo-dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  NGO Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 cursor-pointer"
                >
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;