// src/components/Products/FeaturedBlogs.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPublishedBlogs } from "../../redux/slices/blogSlice.js";

const categoryColors = {
  Education: "text-sage border-sage/30 bg-sage/5",
  Lifestyle: "text-wood border-wood/30 bg-wood/5",
  Wellness: "text-gray-500 border-gray-200 bg-gray-50",
};

const getPostImage = (post) => {
  if (!post?.blocks || !Array.isArray(post.blocks)) return null;

  const imageBlock = post.blocks.find(
    (b) => b.type === "image" && b.imageUrl
  );

  return imageBlock ? imageBlock.imageUrl : null;
};

const FeaturedBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { published, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchPublishedBlogs());
  }, [dispatch]);

  const posts = Array.isArray(published) ? published : [];

  const featured = posts.find((p) => p.featured) || posts[0];

  const rest = posts
    .filter((p) => p._id !== featured?._id)
    .slice(0, 3);

  if (loading || posts.length === 0 || !featured) return null;

  const featuredImage = getPostImage(featured);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 bg-white">

      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between mb-7 sm:mb-10">

          <div>
            <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase mb-2">
              From the Journal
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight">
              Reads Worth Your Time
            </h2>

            <div className="w-8 h-px bg-wood mt-3 sm:mt-5" />
          </div>

          {/* Desktop View All */}
          <button
            onClick={() => navigate("/journal")}
            className="hidden md:inline-block font-body text-xs tracking-[0.15em] uppercase text-gray-500 border border-gray-300 px-5 py-2.5 hover:border-sage hover:text-sage transition-all duration-300"
          >
            View all
          </button>

        </div>

        {/* Featured Article */}
        <div
          onClick={() => navigate(`/journal/${featured.slug}`)}
          className="group cursor-pointer border-t border-gray-200 pt-5 sm:pt-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">

            {/* Image */}
            <div className="w-full aspect-[16/9] md:aspect-[4/3] overflow-hidden">

              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-sage/20 flex items-center justify-center">
                  <p className="font-body text-xs tracking-widest uppercase text-sage/50">
                    {featured.category}
                  </p>
                </div>
              )}

            </div>

            {/* Content */}
            <div className="flex flex-col">

              <div className="flex items-center gap-3 mb-3 flex-wrap">

                <span
                  className={`font-body text-[10px] sm:text-xs px-2.5 py-1 border rounded-full ${
                    categoryColors[featured.category] ||
                    "text-gray-500 border-gray-200 bg-gray-50"
                  }`}
                >
                  {featured.category}
                </span>

                <span className="font-body text-[10px] sm:text-xs text-gray-400">
                  {featured.date} · {featured.readTime} min read
                </span>

              </div>

              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-gray-800 leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
                {featured.title}
              </h3>

              <p className="font-body text-sm text-gray-600 leading-relaxed mb-5 max-w-xl">
                {featured.excerpt}
              </p>

              <span className="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-sage w-fit border-b border-sage/30 pb-1">
                Read article
              </span>

            </div>

          </div>

        </div>

        {/* Supporting Articles */}
        {rest.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-14 border-t border-gray-200">

            {rest.map((post) => {

              const postImage = getPostImage(post);

              return (
                <div
                  key={post._id}
                  onClick={() => navigate(`/journal/${post.slug}`)}
                  className="group cursor-pointer border-b border-gray-200 py-5 sm:py-6"
                >

                  <div className="flex gap-4 sm:gap-6 items-center">

                    {/* Image */}
                    <div className="w-24 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28 flex-shrink-0 overflow-hidden">

                      {postImage ? (
                        <img
                          src={postImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-sand flex items-center justify-center">
                          <p className="font-body text-[9px] tracking-widest uppercase text-gray-400 text-center px-2">
                            {post.category}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">

                        <span
                          className={`font-body text-[9px] sm:text-[10px] px-2 py-0.5 border rounded-full ${
                            categoryColors[post.category] ||
                            "text-gray-500 border-gray-200 bg-gray-50"
                          }`}
                        >
                          {post.category}
                        </span>

                        <span className="font-body text-[10px] text-gray-400">
                          {post.readTime} min read
                        </span>

                      </div>

                      <h3 className="font-heading text-base sm:text-lg md:text-xl text-gray-800 leading-snug mb-1.5 group-hover:text-sage transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="hidden sm:block font-body text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      <span className="inline-block mt-2 font-body text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-gray-400 group-hover:text-sage transition-colors duration-300">
                        Read more →
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-7 md:hidden">

          <button
            onClick={() => navigate("/journal")}
            className="w-full font-body text-[10px] tracking-[0.15em] uppercase text-gray-600 border border-gray-300 px-5 py-3 hover:border-sage hover:text-sage transition-all duration-300"
          >
            View all journal posts
          </button>

        </div>

      </div>

    </section>
  );
};

export default FeaturedBlogs;