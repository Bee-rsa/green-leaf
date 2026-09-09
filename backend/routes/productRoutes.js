const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const handleError = (res, error, message = "Server Error") => {
  console.error(error);
  res.status(500).json({ message });
};

// ─── POST /api/products ───────────────────────────────────────────────────────
// @desc  Create a new product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      customFields,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      return res
        .status(400)
        .json({ message: "A product with this SKU already exists" });
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes: sizes || [],
      colors: colors || [],
      collections,
      material,
      gender: gender || "Unisex",
      images: images || [],
      isFeatured: isFeatured || false,
      isPublished: isPublished || false,
      tags: tags || [],
      dimensions,
      weight,
      sku,
      customFields: customFields || {},   // ← custom fields saved here
      metaTitle,
      metaDescription,
      metaKeywords,
      user: req.user._id,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    handleError(res, error);
  }
});

// ─── PUT /api/products/:id ────────────────────────────────────────────────────
// @desc  Update an existing product
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const fields = [
      "name",
      "description",
      "price",
      "discountPrice",
      "countInStock",
      "category",
      "brand",
      "sizes",
      "colors",
      "collections",
      "material",
      "gender",
      "images",
      "isFeatured",
      "isPublished",
      "tags",
      "dimensions",
      "weight",
      "sku",
      "customFields",       // ← custom fields updated here
      "metaTitle",
      "metaDescription",
      "metaKeywords",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    handleError(res, error);
  }
});

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
// @desc  Delete a product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /api/products ────────────────────────────────────────────────────────
// @desc  Get all products with optional filters (public)
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
      page,
      isFeatured,
      isPublished,
    } = req.query;

    const query = {};

    if (isPublished !== "all") {
      query.isPublished = true;
    }

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = { $regex: collection, $options: "i" };
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (material) {
      query.material = { $in: material.split(",").map((m) => m.trim()) };
    }

    if (brand) {
      query.brand = { $in: brand.split(",").map((b) => b.trim()) };
    }

    if (size) {
      query.sizes = { $in: size.split(",").map((s) => s.trim()) };
    }

    if (color) {
      query.colors = { $in: color.split(",").map((c) => c.trim()) };
    }

    if (gender) {
      query.gender = gender;
    }

    if (isFeatured === "true") {
      query.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const sortOptions = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      popularity: { rating: -1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
    };
    const sort = sortOptions[sortBy] || { createdAt: -1 };

    const pageNum = Number(page) || 1;
    const pageSize = Number(limit) || 0;
    const skip = pageSize ? (pageNum - 1) * pageSize : 0;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(pageSize),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      pages: pageSize ? Math.ceil(total / pageSize) : 1,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /api/products/best-seller ───────────────────────────────────────────
// @desc  Get best selling product
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne({ isPublished: true }).sort({
      rating: -1,
    });
    if (!bestSeller) {
      return res.status(404).json({ message: "No best seller found" });
    }
    res.json(bestSeller);
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /api/products/new-arrivals ──────────────────────────────────────────
// @desc  Get latest 8 published products
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(newArrivals);
  } catch (error) {
    handleError(res, error);
  }
});

// ─── GET /api/products/:id ────────────────────────────────────────────────────
// @desc  Get single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    handleError(res, error);
  }
});

// ─── GET /api/products/similar/:id ───────────────────────────────────────────
// @desc  Get similar products
// @access Public
router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similar = await Product.find({
      _id: { $ne: req.params.id },
      isPublished: true,
      $or: [
        { category: product.category },
        { collections: product.collections },
        { tags: { $in: product.tags } },
      ],
    }).limit(4);

    res.json(similar);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    handleError(res, error);
  }
});

module.exports = router;