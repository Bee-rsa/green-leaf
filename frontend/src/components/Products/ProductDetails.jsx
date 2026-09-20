import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { trackProductView } from "../../utils/analytics";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const [mainImage, setMainImage] = useState("");

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // ---------------------------------------------
  // ANALYTICS - TRACK PRODUCT VIEW
  // ---------------------------------------------
  useEffect(() => {
    if (selectedProduct?._id || selectedProduct?.id) {
      trackProductView({
        id: selectedProduct._id || selectedProduct.id,
        name: selectedProduct.name,
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p
          className="text-sm text-gray-500"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Loading product...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p
          className="text-sm text-red-600"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Error: {error}
        </p>
      </div>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    category,
    brand,
    sizes = [],
    colors = [],
    collections,
    material,
    gender,
    images = [],
    rating = 0,
    numReviews = 0,
    tags = [],
    customFields,
    dimensions,
    weight,
  } = selectedProduct;

  const hasDiscount =
    discountPrice !== undefined &&
    discountPrice !== null &&
    discountPrice < price;

  const hasSizes = sizes?.length > 0;
  const hasColors = colors?.length > 0;
  const hasTags = tags?.length > 0;

  const customFieldEntries = customFields
    ? Object.entries(customFields)
    : [];

  const hasDimensions =
    dimensions &&
    (dimensions.length !== undefined ||
      dimensions.width !== undefined ||
      dimensions.height !== undefined);

  const formatLabel = (value) => {
    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
      .trim();
  };

  const formatCustomValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${formatLabel(key)}: ${val}`)
        .join(", ");
    }

    return String(value);
  };

  return (
    <div className="min-h-screen bg-sand px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Product */}
        <div className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT - PRODUCT IMAGES */}
            <div className="p-4 md:p-8">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMainImage(image.url)}
                      className={`flex-shrink-0 w-20 h-20 overflow-hidden border ${
                        mainImage === image.url
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `${name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT - PRODUCT INFORMATION */}
            <div className="p-6 md:p-10 lg:p-12">
              {category && (
                <p
                  className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {category}
                </p>
              )}

              <h1
                className="text-4xl md:text-5xl text-black leading-tight mb-5"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {name}
              </h1>

              {rating > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= Math.round(rating)
                            ? "text-black"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {rating.toFixed(1)}
                    {numReviews > 0 && ` (${numReviews} reviews)`}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                {hasDiscount ? (
                  <>
                    <span
                      className="text-2xl font-medium text-black"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      R{discountPrice.toFixed(2)}
                    </span>

                    <span
                      className="text-lg text-gray-400 line-through"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      R{price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-2xl font-medium text-black"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    R{price.toFixed(2)}
                  </span>
                )}
              </div>

              {description && (
                <div className="border-t border-gray-200 pt-6 mb-8">
                  <p
                    className="text-sm text-gray-600 leading-7"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {description}
                  </p>
                </div>
              )}

              <div className="mb-8">
                {countInStock > 0 ? (
                  <p
                    className="text-sm text-gray-700"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2" />
                    In stock
                  </p>
                ) : (
                  <p
                    className="text-sm text-red-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Out of stock
                  </p>
                )}
              </div>

              {hasSizes && (
                <div className="mb-8">
                  <h3
                    className="text-sm font-medium text-black mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Available Sizes
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <span
                        key={size}
                        className="px-4 py-2 border border-gray-300 text-sm text-gray-700"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hasColors && (
                <div className="mb-8">
                  <h3
                    className="text-sm font-medium text-black mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Available Colours
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center gap-2 border border-gray-200 px-3 py-2"
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: color.toLowerCase(),
                          }}
                        />

                        <span
                          className="text-sm text-gray-700"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRODUCT DETAILS */}
              <div className="border-t border-gray-200 pt-8">
                <h2
                  className="text-2xl text-black mb-6"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  Product Details
                </h2>

                <div
                  className="divide-y divide-gray-200"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {brand && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">Brand</span>
                      <span className="text-sm text-black text-right">
                        {brand}
                      </span>
                    </div>
                  )}

                  {material && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">Material</span>
                      <span className="text-sm text-black text-right">
                        {material}
                      </span>
                    </div>
                  )}

                  {gender && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">Gender</span>
                      <span className="text-sm text-black text-right">
                        {gender}
                      </span>
                    </div>
                  )}

                  {collections && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">
                        Collection
                      </span>
                      <span className="text-sm text-black text-right">
                        {collections}
                      </span>
                    </div>
                  )}

                  {sku && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">SKU</span>
                      <span className="text-sm text-black text-right">
                        {sku}
                      </span>
                    </div>
                  )}

                  {weight !== undefined && weight !== null && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">Weight</span>
                      <span className="text-sm text-black text-right">
                        {weight}
                      </span>
                    </div>
                  )}

                  {hasDimensions && (
                    <div className="flex justify-between gap-6 py-3">
                      <span className="text-sm text-gray-500">
                        Dimensions
                      </span>

                      <span className="text-sm text-black text-right">
                        {dimensions.length !== undefined &&
                          `${dimensions.length} × `}
                        {dimensions.width !== undefined &&
                          `${dimensions.width} × `}
                        {dimensions.height !== undefined &&
                          `${dimensions.height}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CUSTOM FIELDS */}
              {customFieldEntries.length > 0 && (
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h2
                    className="text-2xl text-black mb-6"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    Product Information
                  </h2>

                  <div
                    className="divide-y divide-gray-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {customFieldEntries.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-6 py-3"
                      >
                        <span className="text-sm text-gray-500">
                          {formatLabel(key)}
                        </span>

                        <span className="text-sm text-black text-right">
                          {formatCustomValue(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAGS */}
              {hasTags && (
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h2
                    className="text-2xl text-black mb-4"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    Tags
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-xs text-gray-600"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts?.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p
                className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Explore More
              </p>

              <h2
                className="text-4xl text-black"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                You May Also Like
              </h2>
            </div>

            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;