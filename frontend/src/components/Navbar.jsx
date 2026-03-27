import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/image.png" alt="logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-gray-900">ResQmeal</span>
        </Link>


        

        {/* Right Side */}
        <div className="relative">

          {!user ? (
            // 🔐 NOT LOGGED IN
            <Link
              to="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Login / Signup
            </Link>
          ) : (
            // 👤 LOGGED IN
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold"
              >
                {user.email?.[0].toUpperCase()}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                  
                  <p className="px-4 py-2 text-xs text-gray-400">
                    {user.email}
                  </p>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Account
                  </Link>

                  <Link
                    to="/add-donation"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Add Listing
                  </Link>

                  <Link
                    to="/restaurant-dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Restaurant Dashboard
                  </Link>

                  <Link
                    to="/ngo-dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    NGO Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
