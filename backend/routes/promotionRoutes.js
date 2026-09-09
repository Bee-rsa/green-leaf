// backend/routes/promotionRoutes.js

const express = require("express");
const router = express.Router();
const Promotion = require("../models/Promotion");

// GET all promotions (admin — all, including inactive)
router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find().sort({ createdAt: -1 });
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch promotions" });
  }
});

// GET active promotions for a specific page (used by frontend pages)
router.get("/page/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const promotions = await Promotion.find({
      page: { $regex: new RegExp(`^${page}$`, "i") },
      active: true,
    }).sort({ featured: -1, createdAt: -1 });
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch promotions for page" });
  }
});

// POST create new promotion
router.post("/", async (req, res) => {
  try {
    const { imageUrl, page, featured } = req.body;
    if (!imageUrl || !page) {
      return res.status(400).json({ message: "imageUrl and page are required" });
    }
    const promotion = await Promotion.create({ imageUrl, page, featured });
    res.status(201).json(promotion);
  } catch (err) {
    res.status(500).json({ message: "Failed to create promotion" });
  }
});

// PATCH toggle active
router.patch("/:id/toggle-active", async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) return res.status(404).json({ message: "Not found" });
    promotion.active = !promotion.active;
    await promotion.save();
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ message: "Failed to update promotion" });
  }
});

// PATCH toggle featured
router.patch("/:id/toggle-featured", async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) return res.status(404).json({ message: "Not found" });
    promotion.featured = !promotion.featured;
    await promotion.save();
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ message: "Failed to update promotion" });
  }
});

// DELETE promotion
router.delete("/:id", async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Promotion deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete promotion" });
  }
});

module.exports = router;