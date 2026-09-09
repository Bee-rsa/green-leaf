import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";
import { HiPlus, HiTrash } from "react-icons/hi2";

// Cannabis-specific category suggestions
const CATEGORY_SUGGESTIONS = [
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

// Custom field input types
const FIELD_TYPES = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Dropdown (comma-separated options)", value: "select" },
  { label: "Yes / No", value: "boolean" },
];

// Auto-generate a product ID
const generateProductId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GL-${timestamp}-${random}`;
};

const inputClass =
  "w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage bg-white";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const sectionClass = "bg-gray-50 rounded-lg p-5 mb-6";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [categoryMode, setCategoryMode] = useState("suggestion"); // 'suggestion' | 'custom'
  const [customFields, setCustomFields] = useState([]);
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    options: "",
  });
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: generateProductId(),
    category: "",
    brand: "",
    collections: "",
    material: "",
    images: [],
    isFeatured: false,
    isPublished: false,
    sizes: [],
    colors: [],
    gender: "Unisex",
    tags: [],
  });

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

  // Custom field handlers
  const handleAddField = () => {
    if (!newField.label.trim()) return;
    setCustomFields((prev) => [
      ...prev,
      {
        ...newField,
        id: Date.now(),
        value: newField.type === "boolean" ? false : "",
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

    dispatch(
      createProduct({
        ...productData,
        customFields: customFieldData,
      })
    );
    navigate("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-3xl text-gray-800 mb-1"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Create Product
        </h2>
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Fill in the details below to add a new product to the catalogue.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Product ID */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass} style={{ marginBottom: 0 }}>
              Product ID
            </label>
            <button
              type="button"
              onClick={() =>
                setProductData((prev) => ({ ...prev, sku: generateProductId() }))
              }
              className="text-xs text-sage hover:underline"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Regenerate
            </button>
          </div>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Auto-generated. You can edit or regenerate.
          </p>
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
              placeholder="e.g. Sunset OG — Premium Flower"
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
              placeholder="Describe the product, its effects, and what makes it special..."
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
            <button
              type="button"
              onClick={() => setCategoryMode("suggestion")}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                categoryMode === "suggestion"
                  ? "bg-sage text-white border-sage"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Suggestions
            </button>
            <button
              type="button"
              onClick={() => setCategoryMode("custom")}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                categoryMode === "custom"
                  ? "bg-sage text-white border-sage"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Custom
            </button>
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

        {/* Collections & Brand */}
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
                placeholder="e.g. Wellness Range"
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
                placeholder="e.g. Green Leaf"
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
          {productData.images.length > 0 && (
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

        {/* Publish & Featured */}
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
              className="flex items-center gap-1.5 text-sm text-sage hover:text-opacity-80 border border-sage px-3 py-1 rounded-md transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <HiPlus className="h-4 w-4" />
              Add Field
            </button>
          </div>

          {/* Field Builder */}
          {showFieldBuilder && (
            <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className={labelClass}>Field Label</label>
                  <input
                    type="text"
                    value={newField.label}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        label: e.target.value,
                      }))
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
                  <label className={labelClass}>
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newField.options}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        options: e.target.value,
                      }))
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
                  className="bg-sage text-white px-4 py-1.5 text-sm rounded-md hover:bg-opacity-90 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Add Field
                </button>
                <button
                  type="button"
                  onClick={() => setShowFieldBuilder(false)}
                  className="text-gray-500 px-4 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Rendered Custom Fields */}
          {customFields.length > 0 && (
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
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
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
          )}

          {customFields.length === 0 && !showFieldBuilder && (
            <p className="text-sm text-gray-400 text-center py-4">
              No custom fields yet. Click "Add Field" to build your product model.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-sage text-white py-3 rounded-md text-sm tracking-wide hover:bg-opacity-90 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;