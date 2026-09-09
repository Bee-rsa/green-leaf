import { Link } from "react-router-dom";

const StarRating = ({ rating = 0, max = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${
            i < Math.round(rating) ? "text-white" : "text-white/30"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse border border-gray-200 rounded-md p-3">
            <div className="bg-gray-100 rounded-sm h-[200px] mb-3" />
            <div className="h-2.5 bg-gray-100 rounded w-2/3 mb-2" />
            <div className="h-2.5 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p
        className="text-sm text-red-400 text-center py-10"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {error}
      </p>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group block border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 transition-colors duration-300"
        >
          {/* Image */}
          <div className="bg-white h-[200px] overflow-hidden">
            {product.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                No image
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-3 py-2.5 border-t border-gray-200 bg-sage">
            <h3
              className="text-sm text-white mb-0.5 truncate"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              {product.name}
            </h3>

            {/* Price + Stars */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                {product.discountPrice ? (
                  <>
                    <span
                      className="text-xs text-white/60 line-through"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      R{product.price}
                    </span>
                    <span
                      className="text-xs text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      R{product.discountPrice}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-xs text-white/80"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    R{product.price}
                  </span>
                )}
              </div>

              {/* Star Rating */}
              <StarRating rating={product.rating ?? 0} />
            </div>

            {/* Hover underline */}
            <div className="h-px bg-white/20 mt-2">
              <div className="h-px bg-white w-0 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;