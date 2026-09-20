const express = require("express");
const Analytics = require("../models/Analytics");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| POST /api/analytics/track
|--------------------------------------------------------------------------
| Records an analytics event from the public website.
|
| This route is intentionally PUBLIC.
| Visitors do not need to be logged in to generate analytics.
|--------------------------------------------------------------------------
*/

router.post("/track", async (req, res) => {
  try {
    const {
      event,
      page,
      product,
      blog,
      visitorId,
      sessionId,
      device,
      referrer,
      language,
    } = req.body;

    if (!event) {
      return res.status(400).json({
        message: "Analytics event is required",
      });
    }

    if (!visitorId) {
      return res.status(400).json({
        message: "Visitor ID is required",
      });
    }

    const allowedEvents = [
      "page_view",
      "product_view",
      "blog_view",
      "whatsapp_click",
      "phone_click",
      "map_click",
    ];

    if (!allowedEvents.includes(event)) {
      return res.status(400).json({
        message: "Invalid analytics event",
      });
    }

    const analyticsData = {
      event,
      page: page || "",
      visitorId,
      sessionId: sessionId || "",
      device: device || "unknown",
      referrer: referrer || "",
      language: language || "",
    };

    /*
     * Product view
     */
    if (event === "product_view" && product) {
      analyticsData.product = {
        id: product.id || null,
        name: product.name || "",
      };
    }

    /*
     * Blog view
     */
    if (event === "blog_view" && blog) {
      analyticsData.blog = {
        id: blog.id || null,
        title: blog.title || "",
      };
    }

    /*
     * If the visitor is logged in, record their user ID.
     *
     * We don't require authentication because analytics
     * must also work for guests.
     */
    if (req.headers.authorization?.startsWith("Bearer")) {
      try {
        const jwt = require("jsonwebtoken");

        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        );

        if (decoded?.user?.id) {
          analyticsData.user = decoded.user.id;
        }
      } catch (error) {
        // Ignore invalid/expired tokens.
        // Analytics should still work for guests.
      }
    }

    const analytics = await Analytics.create(analyticsData);

    res.status(201).json({
      success: true,
      id: analytics._id,
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);

    res.status(500).json({
      message: "Unable to record analytics",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/admin/analytics
|--------------------------------------------------------------------------
| Returns analytics for the admin dashboard.
|
| Protected by:
| protect -> user must be logged in
| admin   -> user must be an admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  protect,
  admin,
  async (req, res) => {
    try {
      /*
       * ---------------------------------------------------------------
       * Date ranges
       * ---------------------------------------------------------------
       */

      const now = new Date();

      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 6);

      sevenDaysAgo.setHours(0, 0, 0, 0);

      const fourteenDaysAgo = new Date(now);
      fourteenDaysAgo.setDate(now.getDate() - 13);

      fourteenDaysAgo.setHours(0, 0, 0, 0);

      /*
       * ---------------------------------------------------------------
       * Basic totals
       * ---------------------------------------------------------------
       */

      const websiteViews = await Analytics.countDocuments({
        event: "page_view",
      });

      const uniqueVisitorsResult = await Analytics.distinct(
        "visitorId",
        {
          event: "page_view",
        }
      );

      const uniqueVisitors = uniqueVisitorsResult.length;

      const productViews = await Analytics.countDocuments({
        event: "product_view",
      });

      const blogViews = await Analytics.countDocuments({
        event: "blog_view",
      });

      /*
       * ---------------------------------------------------------------
       * Most viewed products
       * ---------------------------------------------------------------
       */

      const topProducts = await Analytics.aggregate([
        {
          $match: {
            event: "product_view",
            "product.name": {
              $exists: true,
              $ne: "",
            },
          },
        },
        {
          $group: {
            _id: {
              id: "$product.id",
              name: "$product.name",
            },
            views: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            views: -1,
          },
        },
        {
          $limit: 3,
        },
        {
          $project: {
            _id: 0,
            name: "$_id.name",
            productId: "$_id.id",
            views: 1,
          },
        },
      ]);

      /*
       * ---------------------------------------------------------------
       * Most viewed blogs
       * ---------------------------------------------------------------
       */

      const topBlogs = await Analytics.aggregate([
        {
          $match: {
            event: "blog_view",
            "blog.title": {
              $exists: true,
              $ne: "",
            },
          },
        },
        {
          $group: {
            _id: {
              id: "$blog.id",
              title: "$blog.title",
            },
            views: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            views: -1,
          },
        },
        {
          $limit: 3,
        },
        {
          $project: {
            _id: 0,
            title: "$_id.title",
            blogId: "$_id.id",
            views: 1,
          },
        },
      ]);

      /*
       * ---------------------------------------------------------------
       * Most viewed product
       * ---------------------------------------------------------------
       */

      const mostViewedProduct =
        topProducts.length > 0
          ? topProducts[0]
          : {
              name: "No product views yet",
              views: 0,
            };

      /*
       * ---------------------------------------------------------------
       * Most viewed blog
       * ---------------------------------------------------------------
       */

      const mostViewedBlog =
        topBlogs.length > 0
          ? topBlogs[0]
          : {
              title: "No journal views yet",
              views: 0,
            };

      /*
       * ---------------------------------------------------------------
       * Last 7 days traffic
       * ---------------------------------------------------------------
       */

      const trafficResult = await Analytics.aggregate([
        {
          $match: {
            event: "page_view",
            createdAt: {
              $gte: sevenDaysAgo,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            views: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      /*
       * Create all seven days, including days with zero views.
       */

      const traffic = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);

        date.setDate(sevenDaysAgo.getDate() + i);

        const dateString =
          date.toISOString().split("T")[0];

        const existingDay = trafficResult.find(
          (item) => item._id === dateString
        );

        traffic.push({
          day: date.toLocaleDateString("en-ZA", {
            weekday: "short",
          }),
          date: dateString,
          views: existingDay
            ? existingDay.views
            : 0,
        });
      }

      /*
       * ---------------------------------------------------------------
       * Percentage changes
       *
       * Compare the most recent 7 days with the previous 7 days.
       * ---------------------------------------------------------------
       */

      const currentPeriodStart = new Date(now);
      currentPeriodStart.setDate(now.getDate() - 6);
      currentPeriodStart.setHours(0, 0, 0, 0);

      const previousPeriodStart = new Date(now);
      previousPeriodStart.setDate(now.getDate() - 13);
      previousPeriodStart.setHours(0, 0, 0, 0);

      const previousPeriodEnd = new Date(currentPeriodStart);

      const calculateChange = (
        current,
        previous
      ) => {
        if (previous === 0) {
          return current > 0 ? 100 : 0;
        }

        return (
          ((current - previous) / previous) *
          100
        );
      };

      const currentWebsiteViews =
        await Analytics.countDocuments({
          event: "page_view",
          createdAt: {
            $gte: currentPeriodStart,
          },
        });

      const previousWebsiteViews =
        await Analytics.countDocuments({
          event: "page_view",
          createdAt: {
            $gte: previousPeriodStart,
            $lt: previousPeriodEnd,
          },
        });

      const currentUniqueVisitors =
        await Analytics.distinct(
          "visitorId",
          {
            event: "page_view",
            createdAt: {
              $gte: currentPeriodStart,
            },
          }
        );

      const previousUniqueVisitors =
        await Analytics.distinct(
          "visitorId",
          {
            event: "page_view",
            createdAt: {
              $gte: previousPeriodStart,
              $lt: previousPeriodEnd,
            },
          }
        );

      const currentProductViews =
        await Analytics.countDocuments({
          event: "product_view",
          createdAt: {
            $gte: currentPeriodStart,
          },
        });

      const previousProductViews =
        await Analytics.countDocuments({
          event: "product_view",
          createdAt: {
            $gte: previousPeriodStart,
            $lt: previousPeriodEnd,
          },
        });

      const currentBlogViews =
        await Analytics.countDocuments({
          event: "blog_view",
          createdAt: {
            $gte: currentPeriodStart,
          },
        });

      const previousBlogViews =
        await Analytics.countDocuments({
          event: "blog_view",
          createdAt: {
            $gte: previousPeriodStart,
            $lt: previousPeriodEnd,
          },
        });

      /*
       * ---------------------------------------------------------------
       * Final response
       * ---------------------------------------------------------------
       */

      res.json({
        websiteViews,
        uniqueVisitors,
        productViews,
        blogViews,

        changes: {
          websiteViews: calculateChange(
            currentWebsiteViews,
            previousWebsiteViews
          ),

          uniqueVisitors: calculateChange(
            currentUniqueVisitors.length,
            previousUniqueVisitors.length
          ),

          productViews: calculateChange(
            currentProductViews,
            previousProductViews
          ),

          blogViews: calculateChange(
            currentBlogViews,
            previousBlogViews
          ),
        },

        mostViewedProduct,

        mostViewedBlog,

        topProducts,

        topBlogs,

        traffic,
      });
    } catch (error) {
      console.error(
        "Admin analytics error:",
        error
      );

      res.status(500).json({
        message: "Unable to load analytics",
      });
    }
  }
);

module.exports = router;