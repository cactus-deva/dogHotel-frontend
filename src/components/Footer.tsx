import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#EDE6D6] text-[#3B3B3B] py-6 px-4 mt-3">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Column 1: Brand */}
        <div className="flex flex-col place-items-center">
          <h4 className="text-lg font-bold mb-2">Woof! Hotel</h4>
          <p className="text-sm text-center">
            A luxury stay for your beloved dog where tails wag happily.
          </p>

          {/* 🐾 Social Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-4 text-[#3B3B3B]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A88763] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A88763] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A88763] transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A88763] transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col text-center">
          <h4 className="text-lg font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-center">
            <li>
              <Link to="/" className="hover:text-[#A88763]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-[#A88763]">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#A88763]">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-[#A88763]">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-[#A88763]">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col place-items-center">
          <h4 className="text-lg font-bold mb-2">Contact</h4>
          <p className="text-sm">123 Sukhumvit Road, Bangkok</p>
          <p className="text-sm">(+66) 098 999 9999</p>
          <p className="text-sm">support@woofhotel.com</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 border-t border-gray-300 pt-4 text-center text-xs text-gray-500 relative">
        © 2025 Woof! Hotel. All rights reserved.
        {/* <div className="absolute right-4 bottom-4 hidden sm:block">
          <Link
            to="/admin/login"
            className="text-gray-400 hover:text-gray-600 underline"
          >
            Admin Login
          </Link>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
