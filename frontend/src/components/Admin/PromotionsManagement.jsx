// src/components/Admin/PromotionsManagement.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchAllPromotions,
  createPromotion,
  togglePromotionActive,
  togglePromotionFeatured,
  deletePromotion,
} from "../../redux/slices/promotionsSlice";

const PAGES = ["Home", "Shop", "Products"];

const PromotionsManagement = () => {
  const dispatch = useDispatch();
  const { promotions, loading, error } = useSelector((state) => state.promotions);

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    page: "Home",
    featured: false,
  });

  // Load all promotions from the backend on mount
  useEffect(() => {
    dispatch(fetchAllPromotions());
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    try {
      setUploading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setFormData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Please upload an image first.");
    await dispatch(createPromotion(formData));
    setFormData({ imageUrl: "", page: "Home", featured: false });
  };

  const handleToggleActive = (id) => dispatch(togglePromotionActive(id));
  const handleToggleFeatured = (id) => dispatch(togglePromotionFeatured(id));
  const handleDelete = (id) => {
    if (window.confirm("Delete this promotion?")) dispatch(deletePromotion(id));
  };

  const groupedByPage = PAGES.reduce((acc, page) => {
    acc[page] = promotions.filter((p) => p.page === page);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* Page Header */}
      <div className="mb-10">
        <p className="font-body text-xs tracking-[0.2em] text-gray-400 uppercase mb-1">
          Admin
        </p>
        <h1 className="font-heading text-3xl text-gray-900">
          Promotional Banners
        </h1>
        <div className="w-8 h-px bg-wood mt-3" />
      </div>

      {error && (
        <p className="font-body text-xs text-red-400 mb-6">{error}</p>
      )}

      {/* Upload Form */}
      <div className="border border-gray-100 rounded-sm p-8 mb-12 bg-sand/30">
        <h3 className="font-heading text-xl text-gray-800 mb-6">
          Add New Banner
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Page Select */}
          <div>
            <label className="font-body text-xs tracking-widest uppercase text-gray-500 block mb-2">
              Display On
            </label>
            <select
              value={formData.page}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, page: e.target.value }))
              }
              className="font-body text-sm w-full border border-gray-200 rounded-sm px-4 py-2.5 bg-white focus:outline-none focus:border-sage"
            >
              {PAGES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-body text-xs tracking-widest uppercase text-gray-500 block mb-2">
              Banner Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-sm cursor-pointer hover:border-sage transition-colors bg-white">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-sm"
                />
              ) : (
                <div className="text-center">
                  <p className="font-body text-sm text-gray-400">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </p>
                  <p className="font-body text-xs text-gray-300 mt-1">
                    PNG, JPG, WEBP recommended
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {formData.imageUrl && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
                className="font-body text-xs text-gray-400 hover:text-red-500 mt-2 transition-colors"
              >
                Remove image
              </button>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, featured: !prev.featured }))
              }
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                formData.featured ? "bg-sage" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.featured ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="font-body text-sm text-gray-600">
              Mark as featured
            </span>
          </div>

          <button
            type="submit"
            disabled={uploading || !formData.imageUrl || loading}
            className="font-body text-xs tracking-[0.15em] uppercase bg-sage text-white px-8 py-3 rounded-sm hover:bg-sage/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Banner"}
          </button>
        </form>
      </div>

      {/* Live Banners by Page */}
      <div className="space-y-10">
        <h3 className="font-heading text-xl text-gray-800">Live Banners</h3>

        {loading && (
          <p className="font-body text-xs text-gray-400">Loading banners...</p>
        )}

        {PAGES.map((page) => (
          <div key={page}>
            <div className="flex items-center gap-4 mb-4">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gray-400">
                {page}
              </p>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="font-body text-xs text-gray-300">
                {groupedByPage[page].length} banner
                {groupedByPage[page].length !== 1 ? "s" : ""}
              </span>
            </div>

            {groupedByPage[page].length === 0 ? (
              <p className="font-body text-xs text-gray-300 py-4 pl-1">
                No banners assigned to {page}.
              </p>
            ) : (
              <div className="space-y-3">
                {groupedByPage[page].map((promo) => (
                  <div
                    key={promo._id}
                    className={`flex gap-5 items-center border rounded-sm p-4 transition-all ${
                      promo.active
                        ? "border-gray-100 bg-white"
                        : "border-gray-100 bg-gray-50 opacity-60"
                    }`}
                  >
                    <img
                      src={promo.imageUrl}
                      alt="Banner"
                      className="w-36 h-20 object-cover rounded-sm flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-body text-xs px-2 py-0.5 rounded-full ${
                            promo.active
                              ? "bg-sage/20 text-sage"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {promo.active ? "Active" : "Disabled"}
                        </span>
                        {promo.featured && (
                          <span className="font-body text-xs px-2 py-0.5 rounded-full bg-wood/20 text-wood">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="font-body text-xs text-gray-300 mt-2">
                        Page: {promo.page}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleToggleFeatured(promo._id)}
                        className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                          promo.featured
                            ? "border-wood/40 text-wood hover:bg-wood/10"
                            : "border-gray-200 text-gray-400 hover:border-wood/40 hover:text-wood"
                        }`}
                      >
                        {promo.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        onClick={() => handleToggleActive(promo._id)}
                        className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                          promo.active
                            ? "border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400"
                            : "border-sage/40 text-sage hover:bg-sage/10"
                        }`}
                      >
                        {promo.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleDelete(promo._id)}
                        className="font-body text-xs px-3 py-1.5 rounded-sm border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsManagement;