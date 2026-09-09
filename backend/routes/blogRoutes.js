// backend/routes/blogRoutes.js

const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// GET all blogs (admin — all statuses)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET published blogs only (Journal page)
router.get("/published", async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Published" })
      .sort({ featured: -1, createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET single blog by slug (Journal post page)
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Post not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// GET single blog by id (admin edit)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

// POST create blog
router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog", error: err.message });
  }
});

// PUT update blog
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog", error: err.message });
  }
});

// PATCH toggle status
router.patch("/:id/toggle-status", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    blog.status = blog.status === "Published" ? "Draft" : "Published";
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle status" });
  }
});

// PATCH toggle featured
router.patch("/:id/toggle-featured", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    blog.featured = !blog.featured;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle featured" });
  }
});

// DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

module.exports = router;