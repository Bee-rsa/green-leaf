const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      enum: [
        "page_view",
        "product_view",
        "blog_view",
        "whatsapp_click",
        "phone_click",
        "map_click",
      ],
      index: true,
    },

    // The page that was viewed
    page: {
      type: String,
      trim: true,
    },

    // Product information
    product: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
        trim: true,
      },
    },

    // Blog / Journal information
    blog: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
      title: {
        type: String,
        trim: true,
      },
    },

    // Anonymous visitor identifier
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    // Session identifier
    sessionId: {
      type: String,
      index: true,
    },

    // Logged-in user, if there is one
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Basic device information
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"],
      default: "unknown",
    },

    // Where the visitor came from
    referrer: {
      type: String,
      trim: true,
      default: "",
    },

    // Browser language
    language: {
      type: String,
      trim: true,
      default: "",
    },

    // Country can be added later if needed
    country: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes for analytics queries
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ visitorId: 1, createdAt: -1 });
analyticsSchema.index({ "product.id": 1, event: 1 });
analyticsSchema.index({ "blog.id": 1, event: 1 });

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;