import { IoLogoInstagram, IoLogoFacebook, IoLogoTiktok, IoLogoWhatsapp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/1000602541-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="bg-sand border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-0 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <img src={logo} alt="Green Leaf" className="h-20 w-auto object-contain mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              Thoughtfully curated cannabis for slower moments, good company, and living well.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sage transition-colors">
                <IoLogoInstagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sage transition-colors">
                <IoLogoFacebook className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sage transition-colors">
                <IoLogoTiktok className="h-5 w-5" />
              </a>
              <a href="https://wa.me/27730362644" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sage transition-colors">
                <IoLogoWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm text-gray-800 tracking-widest mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              SHOP
            </h3>
            <ul className="space-y-3">
              <li><Link to="/collections/all?category=Flower" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Flower</Link></li>
              <li><Link to="/collections/all?category=Edibles" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Edibles</Link></li>
              <li><Link to="/collections/all?category=Concentrates" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Concentrates</Link></li>
              <li><Link to="/collections/all?category=Tinctures" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Tinctures</Link></li>
              <li><Link to="/collections/all?category=Topicals" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Topicals</Link></li>
              <li><Link to="/collections/all?category=Accessories" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm text-gray-800 tracking-widest mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Contact Us</Link></li>
              <li><Link to="#" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>About Us</Link></li>
              <li><Link to="#" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>FAQs</Link></li>
              <li><Link to="#" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Terms &amp; Conditions</Link></li>
              <li><Link to="#" className="text-sm text-gray-500 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>Privacy Policy</Link></li>
            </ul>
          </div>

          
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-0 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            © 2025 Green Leaf. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-xs text-gray-400 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Terms &amp; Conditions
            </Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-sage transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;