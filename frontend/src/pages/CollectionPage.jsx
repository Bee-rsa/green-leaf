import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error, total } = useSelector(
    (state) => state.products
  );
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    dispatch(
      fetchProductsByFilters({
        collection,
        ...queryParams,
      })
    );
  }, [dispatch, collection, searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-20">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2
          className="text-2xl text-gray-800"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          {collection ? collection.replace(/-/g, " ") : "All Products"}
        </h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <FaFilter className="h-3 w-3" />
          Filter
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none lg:w-64 lg:border-r lg:border-gray-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span
            className="text-base text-gray-700"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Filters
          </span>
          <button onClick={() => setIsSidebarOpen(false)}>
            <IoMdClose className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <FilterSidebar />
      </div>

      {/* Main */}
      <div className="flex-grow p-4 lg:p-10">
        <div className="hidden lg:flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs text-gray-400 tracking-widest mb-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              GREEN LEAF
            </p>
            <h2
              className="text-4xl text-gray-800 capitalize"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              {collection ? collection.replace(/-/g, " ") : "All Products"}
            </h2>
            {total > 0 && (
              <p
                className="text-sm text-gray-400 mt-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {total} {total === 1 ? "product" : "products"}
              </p>
            )}
          </div>
          <SortOptions />
        </div>

        <div className="lg:hidden mb-4">
          <SortOptions />
        </div>

        {!loading && !error && safeProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p
              className="text-3xl text-gray-300 mb-3"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Nothing here yet
            </p>
            <p
              className="text-sm text-gray-400"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Try adjusting your filters or browse another collection.
            </p>
          </div>
        )}

        <ProductGrid
          products={safeProducts}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CollectionPage;