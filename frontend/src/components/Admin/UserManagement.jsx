import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") dispatch(fetchUsers());
  }, [dispatch, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ name: "", email: "", password: "", role: "admin" });
  };

  const handleRoleChange = (userId, newRole) =>
    dispatch(updateUser({ id: userId, role: newRole }));

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?"))
      dispatch(deleteUser(userId));
  };

  const adminUsers = users.filter((u) => u.role === "admin");

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-3xl text-gray-800 mb-1"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          User Management
        </h2>
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Admin accounts only — {adminUsers.length} admin{adminUsers.length !== 1 ? "s" : ""} registered
        </p>
      </div>

      {loading && (
        <p className="text-sm text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Loading...
        </p>
      )}
      {error && (
        <p className="text-sm text-red-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {error}
        </p>
      )}

      {/* Add Admin Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
        <h3
          className="text-xl text-gray-700 mb-6 border-b border-gray-200 pb-3"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Add New Admin
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}
            <div>
              <label
                className="block text-xs text-gray-500 mb-1.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage bg-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs text-gray-500 mb-1.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@greenleaf.co.za"
                className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage bg-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                required
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label
                className="block text-xs text-gray-500 mb-1.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-md p-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage bg-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
  <HiEyeSlash className="h-4 w-4" />
) : (
  <HiEye className="h-4 w-4" />
)}
                </button>
              </div>
            </div>
          </div>

          {/* Role is fixed to admin — hidden */}
          <input type="hidden" name="role" value="admin" />

          <button
            type="submit"
            className="bg-sage text-white px-6 py-2.5 text-sm rounded-md hover:bg-opacity-90 transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Add Admin
          </button>
        </form>
      </div>

      {/* Admin Users Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3
            className="text-xl text-gray-700"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Admin Users
          </h3>
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Name", "Email", "Role", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-5 text-xs text-gray-400 font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminUsers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-12 text-sm text-gray-400"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  No admin users yet.
                </td>
              </tr>
            )}
            {adminUsers.map((u) => (
              <tr
                key={u._id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td
                  className="py-4 px-5 text-sm text-gray-800 font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {u.name}
                </td>
                <td
                  className="py-4 px-5 text-sm text-gray-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {u.email}
                </td>
                <td className="py-4 px-5">
                  <span
                    className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Admin
                  </span>
                </td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-xs text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 px-3 py-1.5 rounded-md transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;