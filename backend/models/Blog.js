// backend/models/Blog.js

const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  id: Number,
  type: {
    type: String,
    enum: ["paragraph", "heading", "quote", "takeaway", "image"],
    required: true,
  },
  label: String,
  content: String,
  imageUrl: String,
  caption: String,
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String },
    category: {
      type: String,
      enum: ["Education", "Lifestyle", "Wellness"],
      default: "Education",
    },
    excerpt: { type: String },
    tags: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    featured: { type: Boolean, default: false },
    slug: { type: String, unique: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    references: { type: String },
    readTime: { type: Number, default: 1 },
    blocks: [blockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);