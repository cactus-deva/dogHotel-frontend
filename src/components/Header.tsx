import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const { token, username, clearAuthData } = useAuth();

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  const handleLogout = () => {
    clearAuthData?.();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src={logo}
            alt="Woof! Hotel logo"
            className="h-10 w-10 mx-3 sm:h-24 sm:w-24 rounded-full"
          />
        </Link>

        {/* Main Nav */}
        <nav className="flex justify-around items-baseline w-full md:w-2/3 space-y-2 sm:space-y-0 text-xs md:text-md lg:text-lg">
          <Link
            to="/"
            className="text-gray-700 hover:text-[#A88763] text-center"
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-gray-700 hover:text-[#A88763] text-center"
          >
            Services
          </Link>
          {token && (
            <Link
              to="/dog"
              className="text-gray-700 hover:text-[#A88763] text-center"
            >
              My Dog
            </Link>
          )}
          {token && (
            <Link
              to="/booking"
              className="text-gray-700 hover:text-[#A88763] text-center"
            >
              Bookings
            </Link>
          )}

          {token && (
            <Link
              to="/review"
              className="text-gray-700 hover:text-[#A88763] text-center"
            >
              Reviews
            </Link>
          )}
          <Link
            to="/contact"
            className="text-gray-700 hover:text-[#A88763] text-center"
          >
            Contact
          </Link>
        </nav>

        {/* Dropdown */}
        <div
          className="relative flex flex-col items-center justify-center mx-10 w-20 h-23"
          onMouseEnter={toggleDropDown}
          onMouseLeave={closeDropDown}
        >
          <button>
            <FaUserCircle className="text-3xl text-[#A88763] hover:text-[#926f4e] w-5 md:w-7 h-5 md:h-7" />
          </button>
          {token && username && (
            <strong className="text-center text-xs md:text-md text-[#A88763]">{`Welcome ${username}!`}</strong>
          )}
          {showDropDown && (
            <div
              className="flex flex-col items-center absolute top-18 mt-3 w-40 bg-white rounded-md shadow-lg border z-10"
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
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-[#f5f0e7] cursor-pointer"
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
