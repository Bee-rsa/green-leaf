import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error, total } = useSelector(
    (state) => state.adminProducts
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchAdminProducts({ search, category }));
  }, [dispatch, search, category]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-3xl text-gray-800"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Products
          </h2>
          {total !== undefined && (
            <p
              className="text-sm text-gray-400 mt-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {total} {total === 1 ? "product" : "products"} total
            </p>
          )}
        </div>
        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 bg-sage text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <HiPlus className="h-4 w-4" />
          New Product
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, SKU, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-sage"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-sage"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <option value="all">All Categories</option>
          <option value="Flower">Flower</option>
          <option value="Edibles">Edibles</option>
          <option value="Concentrates">Concentrates</option>
          <option value="Tinctures">Tinctures</option>
          <option value="Topicals">Topicals</option>
          <option value="Accessories">Accessories</option>
          <option value="Pre-Rolls">Pre-Rolls</option>
          <option value="Vapes">Vapes</option>
          <option value="Capsules">Capsules</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Product", "Category", "Price", "Stock", "Status", "SKU", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-3 px-4 text-xs text-gray-500 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  {/* Product Name + Image */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex-shrink-0" />
                      )}
                      <span
                        className="text-sm font-medium text-gray-800 max-w-[180px] truncate"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td
                    className="p-4 text-sm text-gray-700"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    R{product.price}
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.countInStock === 0
                          ? "bg-red-50 text-red-500"
                          : product.countInStock < 5
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-green-50 text-green-600"
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {product.countInStock === 0
                        ? "Out of stock"
                        : `${product.countInStock} left`}
                    </span>
                  </td>

                  {/* Published */}
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.isPublished
                          ? "bg-sage bg-opacity-10 text-sage"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {product.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* SKU */}
                  <td
                    className="p-4 text-xs text-gray-400 font-mono"
                  >
                    {product.sku}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded-md hover:border-sage hover:text-sage transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <HiPencil className="h-3 w-3" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 text-xs text-red-400 border border-red-100 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <HiTrash className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-12 text-center">
                  <p
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    No products found. Try a different search or create a new product.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;