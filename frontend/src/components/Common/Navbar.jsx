import { Link } from "react-router-dom";
import { HiOutlineUser, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../../assets/1000602541-removebg-preview.png";

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <div className="bg-sand w-full">
        <nav className="container mx-auto flex items-center justify-between h-16 md:h-24 px-6 overflow-visible">

          {/* Mobile - Left Logo */}
          <div className="md:hidden absolute left-6 z-10">
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
                className="block bg-black px-2 rounded text-sm text-white"
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

          {/* Mobile - Menu Button Only */}
          <div className="md:hidden ml-auto z-20">
            <button onClick={toggleNavDrawer}>
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-sand shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">

          {/* Account / Utility Options */}
          <div className="space-y-5 pb-6 border-b border-gray-300">

            {/* Admin */}
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                onClick={toggleNavDrawer}
                className="block bg-black px-3 py-2 rounded text-sm text-white w-fit"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Admin
              </Link>
            )}

            {/* Profile */}
            <Link
              to="/profile"
              onClick={toggleNavDrawer}
              className="flex items-center gap-3 text-gray-700 hover:text-black"
            >
              <HiOutlineUser className="h-6 w-6" />

              <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Profile
              </span>
            </Link>

            {/* Search */}
            <div className="w-full">
              <SearchBar />
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6">
            <h2
              className="text-xl font-semibold mb-4"
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
            </nav>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;

