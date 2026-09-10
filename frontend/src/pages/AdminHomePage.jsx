// src/pages/AdminHomePage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import {
  HiOutlineEye,
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  /*
   * --------------------------------------------------------------------------
   * TEMPORARY ANALYTICS DATA
   * --------------------------------------------------------------------------
   *
   * These values will later come from your analytics API/database.
   *
   * Example:
   *
   * GET /api/admin/analytics
   *
   * --------------------------------------------------------------------------
   */

  const analytics = {
    websiteViews: 12480,
    uniqueVisitors: 4210,
    productViews: 6820,
    blogViews: 2390,

    mostViewedProduct: {
      name: "Green Leaf Premium Flower",
      views: 1840,
    },

    mostViewedBlog: {
      title: "A Better Way To Unwind",
      views: 940,
    },

    topProducts: [
      {
        name: "Green Leaf Premium Flower",
        views: 1840,
      },
      {
        name: "Green Leaf Pre-Rolls",
        views: 1210,
      },
      {
        name: "Green Leaf Edibles",
        views: 980,
      },
    ],

    topBlogs: [
      {
        title: "A Better Way To Unwind",
        views: 940,
      },
      {
        title: "Understanding Cannabis",
        views: 620,
      },
      {
        title: "Finding Your Perfect Experience",
        views: 410,
      },
    ],

    traffic: [
      { day: "Mon", views: 320 },
      { day: "Tue", views: 480 },
      { day: "Wed", views: 410 },
      { day: "Thu", views: 620 },
      { day: "Fri", views: 780 },
      { day: "Sat", views: 920 },
      { day: "Sun", views: 640 },
    ],
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-ZA").format(number);
  };

  const statCards = [
    {
      title: "Website Views",
      value: formatNumber(analytics.websiteViews),
      change: "+12.4%",
      icon: HiOutlineEye,
    },
    {
      title: "Unique Visitors",
      value: formatNumber(analytics.uniqueVisitors),
      change: "+8.7%",
      icon: HiOutlineUsers,
    },
    {
      title: "Product Views",
      value: formatNumber(analytics.productViews),
      change: "+14.2%",
      icon: HiOutlineCube,
    },
    {
      title: "Blog Views",
      value: formatNumber(analytics.blogViews),
      change: "+9.6%",
      icon: HiOutlineDocumentText,
    },
    {
      title: "Products",
      value: formatNumber(products?.length || 0),
      change: null,
      icon: HiOutlineCube,
    },
    {
      title: "Blog Posts",
      value: "—",
      change: null,
      icon: HiOutlineDocumentText,
    },
  ];

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">

            <div className="h-8 w-56 bg-gray-200 rounded mb-3" />

            <div className="h-4 w-72 bg-gray-200 rounded mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 bg-white rounded-sm border border-gray-200"
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] p-6">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white border border-red-200 p-6 rounded-sm">

            <h2
              className="text-2xl text-gray-800 mb-2"
              style={{
                fontFamily: "'EB Garamond', serif",
              }}
            >
              Unable to load dashboard
            </h2>

            <p
              className="text-sm text-red-500"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Products: {productsError}
            </p>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EC] px-4 py-6 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ---------------------------------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

          <div>

            <p
              className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Green Leaf
            </p>

            <h1
              className="text-4xl md:text-5xl text-gray-900"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontWeight: 400,
              }}
            >
              Analytics
            </h1>

            <p
              className="text-sm text-gray-500 mt-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              An overview of your website, products and journal content.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <Link
              to="/admin/products"
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-600 text-xs tracking-wide hover:border-sage hover:text-sage transition"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Products
            </Link>

            <Link
              to="/admin/blogs"
              className="flex items-center gap-2 px-4 py-2.5 bg-sage text-white text-xs tracking-wide hover:bg-[#526b58] transition"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Manage Journal
            </Link>

          </div>

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main Stats */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

          {statCards.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white border border-gray-200 rounded-sm p-5"
              >

                <div className="flex items-start justify-between mb-5">

                  <div className="w-9 h-9 bg-sage/10 flex items-center justify-center">

                    <Icon className="w-5 h-5 text-sage" />

                  </div>

                  {stat.change && (
                    <span
                      className="flex items-center gap-1 text-[10px] text-sage"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <HiOutlineArrowTrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}

                </div>

                <p
                  className="text-xs text-gray-500 mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {stat.title}
                </p>

                <p
                  className="text-2xl sm:text-3xl text-gray-800"
                  style={{
                    fontFamily: "'EB Garamond', serif",
                  }}
                >
                  {stat.value}
                </p>

              </div>
            );
          })}

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Traffic + Most Viewed */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Website Traffic */}

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm p-6">

            <div className="flex items-start justify-between mb-7">

              <div>

                <p
                  className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Website traffic
                </p>

                <h2
                  className="text-2xl text-gray-800"
                  style={{
                    fontFamily: "'EB Garamond', serif",
                  }}
                >
                  Views this week
                </h2>

              </div>

              <span
                className="text-[10px] tracking-wide text-gray-400"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Last 7 days
              </span>

            </div>

            <div className="h-56 flex items-end gap-3 sm:gap-5 border-b border-gray-200">

              {analytics.traffic.map((item) => {

                const maxViews = Math.max(
                  ...analytics.traffic.map(
                    (day) => day.views
                  )
                );

                const height =
                  (item.views / maxViews) * 100;

                return (
                  <div
                    key={item.day}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                  >

                    <span
                      className="text-[9px] text-gray-400"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {item.views}
                    </span>

                    <div
                      className="w-full max-w-10 bg-sage/80 hover:bg-sage transition-all duration-300"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <span
                      className="text-[10px] text-gray-400 translate-y-6"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {item.day}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Most Viewed */}

          <div className="bg-white border border-gray-200 rounded-sm p-6">

            <p
              className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Top content
            </p>

            <h2
              className="text-2xl text-gray-800 mb-6"
              style={{
                fontFamily: "'EB Garamond', serif",
              }}
            >
              Most Viewed
            </h2>

            {/* Most Viewed Product */}

            <div className="border-b border-gray-200 pb-5 mb-5">

              <div className="flex items-center justify-between mb-2">

                <span
                  className="text-[10px] uppercase tracking-wider text-sage"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Product
                </span>

                <HiOutlineCube className="w-4 h-4 text-gray-400" />

              </div>

              <h3
                className="text-lg text-gray-800 leading-snug"
                style={{
                  fontFamily: "'EB Garamond', serif",
                }}
              >
                {analytics.mostViewedProduct.name}
              </h3>

              <p
                className="text-xs text-gray-400 mt-1"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {formatNumber(
                  analytics.mostViewedProduct.views
                )}{" "}
                views
              </p>

            </div>

            {/* Most Viewed Blog */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <span
                  className="text-[10px] uppercase tracking-wider text-wood"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Journal
                </span>

                <HiOutlineDocumentText className="w-4 h-4 text-gray-400" />

              </div>

              <h3
                className="text-lg text-gray-800 leading-snug"
                style={{
                  fontFamily: "'EB Garamond', serif",
                }}
              >
                {analytics.mostViewedBlog.title}
              </h3>

              <p
                className="text-xs text-gray-400 mt-1"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {formatNumber(
                  analytics.mostViewedBlog.views
                )}{" "}
                views
              </p>

            </div>

          </div>

        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Product + Journal Performance */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Most Viewed Products */}

          <div className="bg-white border border-gray-200 rounded-sm">

            <div className="p-6 border-b border-gray-200 flex items-center justify-between">

              <div>

                <p
                  className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Products
                </p>

                <h2
                  className="text-2xl text-gray-800"
                  style={{
                    fontFamily: "'EB Garamond', serif",
                  }}
                >
                  Most Viewed Products
                </h2>

              </div>

              <Link
                to="/admin/products"
                className="text-gray-400 hover:text-sage transition"
              >
                <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
              </Link>

            </div>

            <div className="divide-y divide-gray-100">

              {analytics.topProducts.map(
                (product, index) => (
                  <div
                    key={product.name}
                    className="p-5 flex items-center gap-4"
                  >

                    <div className="w-8 h-8 flex-shrink-0 bg-sand flex items-center justify-center">

                      <span
                        className="text-sm text-gray-600"
                        style={{
                          fontFamily:
                            "'EB Garamond', serif",
                        }}
                      >
                        {index + 1}
                      </span>

                    </div>

                    <div className="flex-1 min-w-0">

                      <p
                        className="text-sm text-gray-800 truncate"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {product.name}
                      </p>

                      <span
                        className="text-[10px] text-gray-400"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {formatNumber(product.views)}{" "}
                        views
                      </span>

                    </div>

                    <HiOutlineEye className="w-4 h-4 text-gray-300" />

                  </div>
                )
              )}

            </div>

          </div>

          {/* Most Viewed Journal Posts */}

          <div className="bg-white border border-gray-200 rounded-sm">

            <div className="p-6 border-b border-gray-200 flex items-center justify-between">

              <div>

                <p
                  className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Journal
                </p>

                <h2
                  className="text-2xl text-gray-800"
                  style={{
                    fontFamily: "'EB Garamond', serif",
                  }}
                >
                  Most Viewed Articles
                </h2>

              </div>

              <Link
                to="/admin/blogs"
                className="text-gray-400 hover:text-sage transition"
              >
                <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
              </Link>

            </div>

            <div className="divide-y divide-gray-100">

              {analytics.topBlogs.map(
                (blog, index) => (
                  <div
                    key={blog.title}
                    className="p-5 flex items-center gap-4"
                  >

                    <div className="w-8 h-8 flex-shrink-0 bg-sand flex items-center justify-center">

                      <span
                        className="text-sm text-gray-600"
                        style={{
                          fontFamily:
                            "'EB Garamond', serif",
                        }}
                      >
                        {index + 1}
                      </span>

                    </div>

                    <div className="flex-1 min-w-0">

                      <p
                        className="text-sm text-gray-800 leading-snug"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {blog.title}
                      </p>

                      <p
                        className="text-[10px] text-gray-400 mt-1"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {formatNumber(blog.views)} views
                      </p>

                    </div>

                    <HiOutlineEye className="w-4 h-4 text-gray-300" />

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminHomePage;