import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";

  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [
    user,
    guestId,
    cart,
    navigate,
    isCheckoutRedirect,
    dispatch,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-sage flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Green Leaf Branding */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block text-white text-4xl"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
            }}
          >
            Green Leaf
          </Link>

          <div className="w-10 h-px bg-white/50 mx-auto mt-4" />
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#F7F4EC] p-7 sm:p-9 md:p-10 shadow-xl"
        >

          {/* Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl sm:text-4xl text-gray-800 mb-3"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontWeight: 400,
              }}
            >
              Welcome Back
            </h2>

            <p
              className="text-gray-500 text-sm leading-relaxed"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              Sign in to continue your Green Leaf experience.
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              className="block text-xs tracking-widest uppercase text-gray-600 mb-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
              }}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-800 outline-none focus:border-sage transition"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-7">
            <label
              className="block text-xs tracking-widest uppercase text-gray-600 mb-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-800 outline-none focus:border-sage transition"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage text-white py-3.5 tracking-widest text-sm hover:bg-[#526b58] transition duration-300 disabled:opacity-60"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
            }}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

        </form>

        {/* Back to Green Leaf */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white/70 hover:text-white text-xs tracking-widest transition"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
            }}
          >
            ← BACK TO GREEN LEAF
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;