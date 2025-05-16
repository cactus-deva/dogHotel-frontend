import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const nameFromToken = localStorage.getItem("name");
  const nameObj = nameFromToken ? JSON.parse(nameFromToken) : null;

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo */}
        <img
          src={logo}
          alt="Woof! Hotel logo"
          className="h-12 w-12 sm:h-24 sm:w-24 rounded-full"
        />

        {/* Main Nav */}
        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-7 text-base sm:text-lg">
          <Link to="/" className="text-gray-700 hover:text-[#A88763]">
            Home
          </Link>
          <Link to="/service" className="text-gray-700 hover:text-[#A88763]">
            Our Services
          </Link>
          {token && (
            <Link to="/dog" className="text-gray-700 hover:text-[#A88763]">
              My Dog
            </Link>
          )}
          {token && (
            <Link to="/booking" className="text-gray-700 hover:text-[#A88763]">
              My Booking
            </Link>
          )}

          {token && (
            <Link to="/review" className="text-gray-700 hover:text-[#A88763]">
              My Review
            </Link>
          )}
          <Link to="/contact" className="text-gray-700 hover:text-[#A88763]">
            Contact
          </Link>
        </nav>

        {/* Dropdown */}
        <div className="relative flex flex-col items-center py-3"
        onMouseEnter={toggleDropDown} onMouseLeave={closeDropDown}
        >
          <button>
            <FaUserCircle className="text-3xl text-[#A88763] hover:text-[#926f4e]" />
          </button>
          {token && nameObj && (
            <strong className="text-md text-[#A88763]">{`Welcome ${nameObj}!`}</strong>
          )}
          {showDropDown && (
            <div
              className="flex flex-col items-center absolute top-10 mt-2 w-40 bg-white rounded-md shadow-lg border z-10"
              onMouseLeave={closeDropDown}
            >
              {token && (
                <Link
                  to="/profile"
                  onClick={closeDropDown}
                  className="w-full block px-4 py-2 text-sm text-gray-700 text-center hover:bg-[#f5f0e7]"
                >
                  Profile
                </Link>
              )}
              {!token && (
                <Link
                  to="/login"
                  onClick={closeDropDown}
                  className="w-full block px-4 py-2 text-sm text-gray-700 text-center hover:bg-[#f5f0e7]"
                >
                  Login
                </Link>
              )}
              <Link
                to="/register"
                onClick={closeDropDown}
                className="w-full block px-4 py-2 text-sm text-gray-700 text-center hover:bg-[#f5f0e7]"
              >
                Register
              </Link>
              {token && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-[#f5f0e7]"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
