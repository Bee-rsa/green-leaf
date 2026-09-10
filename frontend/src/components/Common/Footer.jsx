import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTiktok,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/1000602541-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="bg-sand border-t border-gray-200">

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-0 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Green Leaf"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">

            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Home
            </Link>

            <Link
              to="/collections/all"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Shop
            </Link>

            <Link
              to="/experience"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Experience
            </Link>

            <Link
              to="/journal"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Journal
            </Link>

            <Link
              to="/our-space"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Our Space
            </Link>

            <Link
              to="/terms"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="text-sm text-gray-600 hover:text-sage transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            >
              Contact Us
            </Link>

          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sage transition-colors"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sage transition-colors"
            >
              <IoLogoFacebook className="h-5 w-5" />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sage transition-colors"
            >
              <IoLogoTiktok className="h-5 w-5" />
            </a>

            <a
              href="https://wa.me/27730362644"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sage transition-colors"
            >
              <IoLogoWhatsapp className="h-5 w-5" />
            </a>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">

        <div className="container mx-auto px-6 lg:px-0 py-3 flex items-center justify-center">

          <p
            className="text-xs text-gray-400 text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            © 2026 Green Leaf. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;