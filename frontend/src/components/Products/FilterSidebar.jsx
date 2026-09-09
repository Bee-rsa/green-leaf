import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    "Flower",
    "Edibles",
    "Concentrates",
    "Tinctures",
    "Topicals",
    "Accessories",
    "Pre-Rolls",
    "Vapes",
    "Capsules",
    "Beverages",
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newMax = e.target.value;
    setPriceRange([0, newMax]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newMax };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleClear = () => {
    setFilters({ category: "", color: "", minPrice: 0, maxPrice: 1000 });
    setPriceRange([0, 1000]);
    setSearchParams({});
    navigate("?");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-lg text-gray-800"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Filters
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-gray-400 hover:text-sage underline"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="mb-8">
        <p
          className="text-xs text-gray-400 tracking-widest mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          CATEGORY
        </p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={handleFilterChange}
                className="accent-sage"
              />
              <span
                className={`text-sm transition-colors ${
                  filters.category === cat
                    ? "text-sage"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <p
          className="text-xs text-gray-400 tracking-widest mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          PRICE RANGE
        </p>
        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-sage"
        />
        <div
          className="flex justify-between text-xs text-gray-400 mt-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>R0</span>
          <span>R{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;