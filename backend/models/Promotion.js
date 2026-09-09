// backend/models/Promotion.js

const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      enum: ["Home", "Shop", "Products"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionSchema);