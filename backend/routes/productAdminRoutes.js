const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ─── GET /api/admin/products ──────────────────────────────────────────────────
// @desc  Get all products for admin (published and unpublished)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const { search, category, sortBy, page, limit } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      nameAsc: { name: 1 },
    };
    const sort = sortOptions[sortBy] || { createdAt: -1 };

    const pageNum = Number(page) || 1;
    const pageSize = Number(limit) || 50;
    const skip = (pageNum - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(pageSize),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ─── GET /api/admin/products/stats ───────────────────────────────────────────
// @desc  Quick stats for admin dashboard
// @access Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const [total, published, unpublished, outOfStock, featured] =
      await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ isPublished: true }),
        Product.countDocuments({ isPublished: false }),
        Product.countDocuments({ countInStock: 0 }),
        Product.countDocuments({ isFeatured: true }),
      ]);

    res.json({ total, published, unpublished, outOfStock, featured });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;