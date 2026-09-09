import { useCallback, useEffect, useRef } from "react";
import {
  FaBookOpen,
  FaBullhorn,
  FaPlus,
  FaBoxOpen,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import logo from "../../assets/1000602541-removebg-preview.png";

const INACTIVITY_LIMIT = 30 * 60 * 1000;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT);
    };
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [handleLogout]);

  const linkBase =
    "font-text text-white/50 hover:bg-white/10 hover:text-white py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-sm";
  const linkActive =
    "font-text bg-white/20 text-white py-2.5 px-4 rounded-xl flex items-center gap-3 text-sm font-semibold border-l-2 border-white/60";

  const navClass = ({ isActive }) => (isActive ? linkActive : linkBase);

  const SectionLabel = ({ children }) => (
    <p className="font-text text-[9px] text-white/30 uppercase tracking-[0.2em] px-4 pt-5 pb-1.5">
      {children}
    </p>
  );

  return (
    <div className="h-full flex flex-col py-6 px-3 bg-sage">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 px-2">
        <Link to="/admin">
          <img
            src={logo}
            alt="Green Leaf Logo"
            className="h-20 w-auto object-contain"
          />
        </Link>
        <div className="mt-4 w-full border-t border-white/15" />
        <p className="font-text text-[9px] text-white/40 tracking-[0.25em] uppercase mt-3">
          Admin Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col flex-1 space-y-0.5">
        <SectionLabel>Users</SectionLabel>
        <NavLink to="/admin/users" className={navClass}>
          <FaUser size={12} />
          <span>Users</span>
        </NavLink>

        <SectionLabel>Products</SectionLabel>
        <NavLink to="/admin/products" className={navClass}>
          <FaBoxOpen size={12} />
          <span>View Products</span>
        </NavLink>
        <NavLink to="/admin/products/create" className={navClass}>
          <FaPlus size={12} />
          <span>Create Product</span>
        </NavLink>

        <SectionLabel>Content</SectionLabel>
        <NavLink to="/admin/educational" className={navClass}>
          <FaBookOpen size={12} />
          <span>Educational</span>
        </NavLink>
        <NavLink to="/admin/promotions" className={navClass}>
          <FaBullhorn size={12} />
          <span>Promotions</span>
        </NavLink>

        <SectionLabel>Store</SectionLabel>
        <NavLink to="/" className={navClass}>
          <FaStore size={12} />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-4 px-2">
        <div className="border-t border-white/15 mb-4" />
        <button
          onClick={handleLogout}
          className="font-text w-full text-white/40 hover:text-white hover:bg-white/10 py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-sm"
        >
          <FaSignOutAlt size={12} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;