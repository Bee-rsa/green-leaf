
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

// ── CORS CONFIGURATION ────────────────────────────────────────────────────────

const allowedOrigins = [
  "https://greenleafcannabisclub.co.za",
  "https://www.greenleafcannabisclub.co.za",

  // Current Vercel frontend/backend domains
  "https://green-leaf-gilt-nu.vercel.app",
  "https://green-leaf-vo5y.vercel.app",

  // Local development
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────

app.use(express.json());

// ── DATABASE ──────────────────────────────────────────────────────────────────

connectDB();

// ── HEALTH CHECK ──────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.send("WELCOME TO GREEN LEAF API!");
});

// ── API ROUTES ─────────────────────────────────────────────────────────────────

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);
app.use("/api/promotions", promotionRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

// ── LOCAL DEVELOPMENT SERVER ───────────────────────────────────────────────────

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// ── EXPORT APP ────────────────────────────────────────────────────────────────

module.exports = app;