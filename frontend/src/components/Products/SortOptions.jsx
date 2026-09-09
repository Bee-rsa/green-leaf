import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs text-gray-400"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Sort
      </span>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sage bg-white"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;