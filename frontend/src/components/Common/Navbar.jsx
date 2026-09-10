import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiBars3BottomRight,
  HiOutlineMagnifyingGlass
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../../assets/1000602541-removebg-preview.png";

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchEnd - touchStart;

    // Strong swipe to the left closes the drawer
    if (swipeDistance < -100) {
      setNavDrawerOpen(false);
    }

    setTouchStart(null);
  };

  return (
    <>
      <div className="bg-sand w-full">
        <nav className="container mx-auto flex items-center justify-between h-16 md:h-24 px-6 overflow-visible">

          {/* Mobile - Left Logo */}
          <div className="md:hidden absolute left-2 z-10">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop - Logo */}
          <div className="hidden md:block relative w-32">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="absolute -translate-y-1/2 top-1/2 h-56 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { label: "Shop", to: "/collections/all" },
              { label: "Experience", to: "/experience" },
              { label: "Journal", to: "/journal" },
              { label: "Our Space", to: "/our-space" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-700 hover:text-black text-sm font-medium tracking-wide"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="px-2 rounded text-m text-sage"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Admin
              </Link>
            )}

            <Link to="/profile" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>

            <div className="overflow-hidden">
              <SearchBar />
            </div>
          </div>

          {/* Mobile - Search + Menu */}
          <div className="md:hidden ml-auto z-20 flex items-center gap-4">
            <button>
              <HiOutlineMagnifyingGlass className="h-6 w-6 text-gray-700" />
            </button>

            <button onClick={toggleNavDrawer}>
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-sand shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">

          {/* Menu */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Menu
            </h2>

            <nav className="space-y-5">

              {[
                { label: "Shop", to: "/collections/all" },
                { label: "Experience", to: "/experience" },
                { label: "Journal", to: "/journal" },
                { label: "Our Space", to: "/our-space" },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </Link>
              ))}

              {/* Profile - Only when NOT logged in */}
              {!user && (
                <Link
                  to="/profile"
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Profile
                </Link>
              )}

              {/* Admin - Only when logged in as admin */}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={toggleNavDrawer}
                  className="block text-sage hover:text-black"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Admin
                </Link>
              )}

            </nav>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;