const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const blogRoutes = require("./routes/blogRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const contactRoutes = require("./routes/contactRoutes");


const app = express();

app.use(express.json());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "https://green-leaf-vo5y.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ── DATABASE ─────────────────────────────────────────────────────────────────
connectDB();

// ── ROOT ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("WELCOME TO GREEN LEAF API!");
});

// ── PUBLIC API ROUTES ────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);
app.use("/api/promotions", promotionRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
// Public tracking:
// POST /api/analytics/track
//
// Admin dashboard:
// GET /api/admin/analytics
app.use("/api/analytics", analyticsRoutes);

// ── ADMIN API ROUTES ─────────────────────────────────────────────────────────
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ── DEVELOPMENT SERVER ──────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;