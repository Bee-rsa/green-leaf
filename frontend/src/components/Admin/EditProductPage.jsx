import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";
import axios from "axios";
import { HiPlus, HiTrash } from "react-icons/hi2";

const CATEGORY_SUGGESTIONS = [
  "Flower", "Edibles", "Concentrates", "Tinctures", "Topicals",
  "Accessories", "Pre-Rolls", "Vapes", "Capsules", "Beverages",
];

const FIELD_TYPES = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Dropdown (comma-separated options)", value: "select" },
  { label: "Yes / No", value: "boolean" },
];

const inputClass =
  "w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage bg-white";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const sectionClass = "bg-gray-50 rounded-lg p-5 mb-6";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [uploading, setUploading] = useState(false);
  const [categoryMode, setCategoryMode] = useState("suggestion");
  const [customFields, setCustomFields] = useState([]);
  const [newField, setNewField] = useState({ label: "", type: "text", options: "" });
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "Unisex",
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: [],
    customFields: {},
  });

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        ...selectedProduct,
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        tags: selectedProduct.tags || [],
        images: selectedProduct.images || [],
      });

      // Restore custom fields from saved data
      if (selectedProduct.customFields) {
        const restored = Object.entries(selectedProduct.customFields).map(
          ([label, value], i) => ({
            id: Date.now() + i,
            label,
            value,
            type: typeof value === "number" ? "number" : "text",
            options: [],
          })
        );
        setCustomFields(restored);
      }

      // Detect if category is a suggestion or custom
      if (!CATEGORY_SUGGESTIONS.includes(selectedProduct.category)) {
        setCategoryMode("custom");
      }
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddField = () => {
    if (!newField.label.trim()) return;
    setCustomFields((prev) => [
      ...prev,
      {
        ...newField,
        id: Date.now(),
        value: newField.type === "boolean" ? "" : "",
        options:
          newField.type === "select"
            ? newField.options.split(",").map((o) => o.trim())
            : [],
      },
    ]);
    setNewField({ label: "", type: "text", options: "" });
    setShowFieldBuilder(false);
  };

  const handleCustomFieldChange = (id, value) => {
    setCustomFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  const handleRemoveCustomField = (id) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customFieldData = customFields.reduce((acc, f) => {
      acc[f.label] = f.value;
      return acc;
    }, {});
    dispatch(updateProduct({ id, productData: { ...productData, customFields: customFieldData } }));
    navigate("/admin/products");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Loading product...
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2
          className="text-3xl text-gray-800 mb-1"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Edit Product
        </h2>
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Update the product details below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Product ID */}
        <div className={sectionClass}>
          <label className={labelClass}>Product ID (SKU)</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        {/* Core Info */}
        <div className={sectionClass}>
          <h3
            className="text-base text-gray-600 mb-4 border-b border-gray-200 pb-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Core Information
          </h3>
          <div className="mb-4">
            <label className={labelClass}>Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className={inputClass}
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (R)</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className={inputClass}
                min={0}
              />
            </div>
            <div>
              <label className={labelClass}>Count in Stock</label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                className={inputClass}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className={sectionClass}>
          <h3
            className="text-base text-gray-600 mb-4 border-b border-gray-200 pb-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Category
          </h3>
          <div className="flex gap-3 mb-4">
            {["suggestion", "custom"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCategoryMode(mode)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  categoryMode === mode
                    ? "bg-sage text-white border-sage"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {mode === "suggestion" ? "Suggestions" : "Custom"}
              </button>
            ))}
          </div>
          {categoryMode === "suggestion" ? (
            <div className="flex flex-wrap gap-2">
              {CATEGORY_SUGGESTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setProductData((prev) => ({ ...prev, category: cat }))
                  }
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    productData.category === cat
                      ? "bg-sage text-white border-sage"
                      : "bg-white text-gray-600 border-gray-200 hover:border-sage"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className={inputClass}
              placeholder="Type your custom category..."
            />
          )}
          {productData.category && (
            <p className="text-xs text-sage mt-2">
              Selected: <strong>{productData.category}</strong>
            </p>
          )}
        </div>

        {/* Collection & Brand */}
        <div className={sectionClass}>
          <h3
            className="text-base text-gray-600 mb-4 border-b border-gray-200 pb-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Collection & Brand
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Collection</label>
              <input
                type="text"
                name="collections"
                value={productData.collections}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Brand</label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className={sectionClass}>
          <h3
            className="text-base text-gray-600 mb-4 border-b border-gray-200 pb-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Product Images
          </h3>
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <span
              className="text-sm text-white bg-sage px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {productData.images?.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {productData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={image.altText || "Product"}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visibility */}
        <div className={sectionClass}>
          <h3
            className="text-base text-gray-600 mb-4 border-b border-gray-200 pb-2"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Visibility
          </h3>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={productData.isPublished}
                onChange={handleChange}
                className="accent-sage w-4 h-4"
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={productData.isFeatured}
                onChange={handleChange}
                className="accent-sage w-4 h-4"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        {/* Custom Fields */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
            <h3
              className="text-base text-gray-600"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Custom Fields
            </h3>
            <button
              type="button"
              onClick={() => setShowFieldBuilder(!showFieldBuilder)}
              className="flex items-center gap-1.5 text-sm text-sage border border-sage px-3 py-1 rounded-md transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <HiPlus className="h-4 w-4" />
              Add Field
            </button>
          </div>

          {showFieldBuilder && (
            <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className={labelClass}>Field Label</label>
                  <input
                    type="text"
                    value={newField.label}
                    onChange={(e) =>
                      setNewField((prev) => ({ ...prev, label: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="e.g. THC Content"
                  />
                </div>
                <div>
                  <label className={labelClass}>Input Type</label>
                  <select
                    value={newField.type}
                    onChange={(e) =>
                      setNewField((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className={inputClass}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {newField.type === "select" && (
                <div className="mb-3">
                  <label className={labelClass}>Options (comma-separated)</label>
                  <input
                    type="text"
                    value={newField.options}
                    onChange={(e) =>
                      setNewField((prev) => ({ ...prev, options: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="e.g. Indica, Sativa, Hybrid"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="bg-sage text-white px-4 py-1.5 text-sm rounded-md"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Add Field
                </button>
                <button
                  type="button"
                  onClick={() => setShowFieldBuilder(false)}
                  className="text-gray-500 px-4 py-1.5 text-sm rounded-md border border-gray-200"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {customFields.length > 0 ? (
            <div className="space-y-3">
              {customFields.map((field) => (
                <div key={field.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>{field.label}</label>
                    {field.type === "text" && (
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className={inputClass}
                      />
                    )}
                    {field.type === "number" && (
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className={inputClass}
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        value={field.value}
                        onChange={(e) =>
                          handleCustomFieldChange(field.id, e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="">Select...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {field.type === "boolean" && (
                      <div className="flex gap-4 mt-1">
                        {["Yes", "No"].map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                          >
                            <input
                              type="radio"
                              name={`field-${field.id}`}
                              value={opt}
                              checked={field.value === opt}
                              onChange={() =>
                                handleCustomFieldChange(field.id, opt)
                              }
                              className="accent-sage"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(field.id)}
                    className="mt-5 text-red-400 hover:text-red-600"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !showFieldBuilder && (
              <p
                className="text-sm text-gray-400 text-center py-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                No custom fields. Click "Add Field" to add one.
              </p>
            )
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-sage text-white py-3 rounded-md text-sm tracking-wide hover:bg-opacity-90 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;